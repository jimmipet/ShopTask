import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import Product, { CartItem } from '../../../../typing';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private readonly cart$ = new BehaviorSubject<CartItem[]>([]);

  public addToCart(product: Product): void {
    const currentCartItems = this.getCurrentCartItems();
    const existingItem = currentCartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCartItems.push({ product, quantity: 1 });
    }

    this.cart$.next([...currentCartItems]);
  }

  public removeFromCart(productId: number): void {
    const currentCartItems = this.getCurrentCartItems();
    const updatedCartItems = currentCartItems.filter(item => item.product.id !== productId);

    this.cart$.next(updatedCartItems);
  }

  public increaseQuantity(productId: number): void {
    const currentCartItems = this.getCurrentCartItems();
    const product = currentCartItems.find(item => item.product.id === productId);

    if (product) {
      product.quantity += 1;
      this.cart$.next([...currentCartItems]);
    }
  }

  public decreaseQuantity(productId: number): void {
    const currentCartItems = this.getCurrentCartItems();
    const product = currentCartItems.find(item => item.product.id === productId);
    
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      this.cart$.next([...currentCartItems]);
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
  private getCurrentCartItems(): CartItem[] {
    return this.cart$.getValue();
  }

  public getCartItemCount(): Observable<number> {
    return this.getCart().pipe(
      map((items: CartItem[]) =>
        items.reduce((count, item) => count + item.quantity, 0)
      )
    );
  }
}