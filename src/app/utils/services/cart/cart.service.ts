import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import Product from '../../../../typing';
import { CardListItemService } from '../api/card-list-item.service';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private readonly totalSumSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly cardListItemService: CardListItemService = inject(CardListItemService);
  private readonly quantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly totalSum$ : Observable<number> = this.totalSumSubject.asObservable();
  public readonly quantity$: Observable<number> = this.quantitySubject.asObservable();

  public async addToCart(product: Product): Promise<void> {
    await firstValueFrom(this.cardListItemService.addProductToCart(product.id))
    this.updateQuantity();
  }
  
  public removeFromCart(productId: number):  Observable<string>{
    return this.cardListItemService.removeProductCart(productId)
  }

  public increaseQuantity(productId: number): Observable<string> {
    const result = this.cardListItemService.increaseQuantity(productId);
    result.subscribe(() => {
      this.updateQuantity();
    });
    return result;
  }

  public decreaseQuantity(productId: number): Observable<string> {
    const result = this.cardListItemService.decreaseQuantity(productId);
    result.subscribe(async () => {
        const cartItems = await firstValueFrom(this.cardListItemService.getProductCart());
        if (!cartItems || cartItems.length === 0) {
            console.warn('Корзина пуста');
            this.updateQuantity();
            return;
        }
        const item = cartItems.find(item => item.id === productId);
        if (item && item.count === 0) {
            await firstValueFrom(this.removeFromCart(productId));
        }
        this.updateQuantity();
    });
    return result;
}

  
  public async updateQuantity(): Promise<void> {
    const cartItems = await firstValueFrom(this.cardListItemService.getProductCart());
    if (!cartItems || cartItems.length === 0) {
      this.quantitySubject.next(0);
      this.totalSumSubject.next(0);
      return;
  }
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.count, 0);
    this.quantitySubject.next(totalQuantity)

    const totalSum = cartItems.reduce((sum, item) => sum + (item.price), 0);
    this.totalSumSubject.next(totalSum);
  }
}