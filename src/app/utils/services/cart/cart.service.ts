import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Product, { CartItem } from '../../../../typing';


@Injectable({
  providedIn: 'root',
})


export class CartService {

  private readonly productsInCart: CartItem[] = [];
  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.productsInCart);

  public addToCart(product: Product): void {
    const existingItem = this.productsInCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.productsInCart.push({ product, quantity: 1 });
    }

    this.cartSubject.next([...this.productsInCart]);
  }

  public removeFromCart(productId: number): void {
    const itemIndex = this.productsInCart.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
      this.productsInCart.splice(itemIndex, 1);
      this.cartSubject.next([...this.productsInCart]);
    }
  }

  public increaseQuantity(productId: number): void {
    const product = this.productsInCart.find(item => item.product.id === productId);

    if (product) {
      this.addToCart(product.product);
    }
  }

  public decreaseQuantity(productId: number): void {
    const product = this.productsInCart.find(item => item.product.id === productId);
    
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      this.cartSubject.next([...this.productsInCart]);
    } else if (product && product.quantity === 1) {
      this.removeFromCart(productId);
    }
  }

//текущее состояние корзины
  public getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

}
