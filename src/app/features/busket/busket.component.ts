import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Product, { CartItem } from '../../../typing';
import { CartService } from '../../utils/services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrl: './busket.component.scss',
  imports: [CommonModule],
})
export class BusketComponent implements OnInit {
  public cartItems$: Observable<CartItem[]> | undefined;

  private readonly cartService:CartService = inject(CartService);

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCart();
  }

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
