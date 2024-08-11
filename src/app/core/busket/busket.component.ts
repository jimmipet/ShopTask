import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from '../../../typing';
import { CartService } from '../../utils/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { BusketItemComponent } from "../../features/busket-item/busket-item.component";

@Component({
  standalone: true,
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrl: './busket.component.scss',
  imports: [CommonModule, BusketItemComponent],
})
export class BusketComponent implements OnInit {
  public cartItems$: Observable<CartItem[]> | undefined;
  public totalSum$: Observable<number> | undefined;

  private readonly cartService:CartService = inject(CartService);

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCart();
    
    this.totalSum$ = this.cartItems$.pipe(
      map((items: CartItem[]) =>
        items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      )
    );
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
