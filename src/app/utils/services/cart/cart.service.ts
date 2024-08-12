import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import Product, { CartItem } from '../../../../typing';


@Injectable({
  providedIn: 'root',
})


export class CartService {
  
  private readonly cart$ = new BehaviorSubject<CartItem[]>([]);
  private readonly cartItemCount = new BehaviorSubject<number>(0);

  public addToCart(product: Product): void {
    const currentCartItems = this.cart$.getValue();
    const existingItem = currentCartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCartItems.push({ product, quantity: 1 });
    }

    this.cart$.next([...currentCartItems]);
    this.cartItemCount.next(currentCartItems.reduce((count, item) => count + item.quantity, 0));
  }

  public removeFromCart(productId: number): void {
    const currentCartItems = this.cart$.getValue();
    const updatedCartItems = currentCartItems.filter(item => item.product.id !== productId);

    this.cart$.next(updatedCartItems);
    this.cartItemCount.next(updatedCartItems.reduce((count, item) => count + item.quantity, 0));
  }

  public increaseQuantity(productId: number): void {
    const currentCartItems = this.cart$.getValue();
    const product = currentCartItems.find(item => item.product.id === productId);

    if (product) {
      product.quantity += 1;
      this.cart$.next([...currentCartItems]);
      this.cartItemCount.next(currentCartItems.reduce((count, item) => count + item.quantity, 0));
    }
  }

  public decreaseQuantity(productId: number): void {
    const currentCartItems = this.cart$.getValue();
    const product = currentCartItems.find(item => item.product.id === productId);
    
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      this.cart$.next([...currentCartItems]);
      this.cartItemCount.next(currentCartItems.reduce((count, item) => count + item.quantity, 0));
    } else if (product && product.quantity === 1) {
      this.removeFromCart(productId);
    }
  }

  public calculateTotalSum(cartItems$: Observable<CartItem[]>): Observable<number> {
    return cartItems$.pipe(
      map((items: CartItem[]) =>
        items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      )
    );
  }

  // Текущее состояние корзины
  public getCart(): Observable<CartItem[]> {
    return this.cart$.asObservable();
  }

  // Состояние количества товаров в корзине
  public readonly cartItemCount$: Observable<number> = this.cartItemCount.asObservable();

}