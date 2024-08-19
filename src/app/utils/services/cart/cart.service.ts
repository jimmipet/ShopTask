import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable} from 'rxjs';
import Product from '../../../../typing';
import { CardListItemService } from '../api/card-list-item.service';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private readonly cardListItemService: CardListItemService = inject(CardListItemService);

  public async addToCart(product: Product): Promise<void> {
    await firstValueFrom(this.cardListItemService.addProductToCart(product.id))
  }
  
  public removeFromCart(productId: number):  Observable<string>{
    return this.cardListItemService.removeProductCart(productId)
  }

  public increaseQuantity(productId: number): Observable<string> {
     return this.cardListItemService.increaseQuantity(productId);
  }

  public decreaseQuantity(productId: number): Observable<string> {
    return this.cardListItemService.decreaseQuantity(productId); 
  }
}