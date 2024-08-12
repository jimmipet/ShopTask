import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from '../../../../typing';
import { CartService } from '../../../utils/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CommonModule, CartItemComponent],
})
export class CartComponent {

  public readonly cartItems$: Observable<CartItem[]> = inject(CartService).getCart();
  public readonly totalSum$: Observable<number> = inject(CartService).calculateTotalSum(this.cartItems$);
  private readonly cartService = inject(CartService);
  
  public removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  public increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  public decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }
}
