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
  
  @Output() public readonly removeItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() public readonly increaseItemQuantity: EventEmitter<number> = new EventEmitter<number>();
  @Output() public readonly decreaseItemQuantity: EventEmitter<number> = new EventEmitter<number>();

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
