import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../../typing';

@Component({
  standalone: true,
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  
  @Input({ required: true }) cartItems!: CartItem[];
  
  @Output() removeItem = new EventEmitter<number>();
  @Output() increaseItemQuantity = new EventEmitter<number>();
  @Output() decreaseItemQuantity = new EventEmitter<number>();

  public onRemoveFromCart(productId: number): void {
    this.removeItem.emit(productId);
  }

  public onIncreaseQuantity(productId: number): void {
    this.increaseItemQuantity.emit(productId);
  }

  public onDecreaseQuantity(productId: number): void {
    this.decreaseItemQuantity.emit(productId);
  }

}
