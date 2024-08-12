import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartService } from '../../utils/services/cart/cart.service';
import { CartItem } from '../../../typing';

@Component({
  standalone: true,
  selector: 'app-busket-item',
  templateUrl: './busket-item.component.html',
  styleUrl: './busket-item.component.scss'
})
export class BusketItemComponent {
  
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
