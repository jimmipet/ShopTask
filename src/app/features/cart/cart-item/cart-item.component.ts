import { Component, inject, Input} from '@angular/core';
import { CartItem } from '../../../../typing';
import { CartService } from '../../../utils/services/cart/cart.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  public readonly cartService: CartService= inject (CartService);

  @Input({ required: true }) cartItems!: CartItem[] | null;
  
  public async onRemoveFromCart(productId: number): Promise<void>  {
    await firstValueFrom(this.cartService.removeFromCart(productId))
    if (this.cartItems) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
    }
  }

  public async onIncreaseQuantity(productId: number): Promise<void> {
    await firstValueFrom(this.cartService.increaseQuantity(productId))
    if (this.cartItems) {
      const item = this.cartItems.find(item => item.id === productId);
      if (item && item.count > 0) {
        item.count += 1;
        item.price += item.price / (item.count-1)
      }
    }
  }
  
  public async onDecreaseQuantity(productId: number): Promise<void> {
    await firstValueFrom(this.cartService.decreaseQuantity(productId));
    if (this.cartItems) {
      const item = this.cartItems.find(item => item.id === productId);
      if (item) {
        if (item.count > 1) {
          item.price -= item.price / item.count;
          item.count -= 1;
        } else {
          await this.onRemoveFromCart(productId);
        }
      }
    }
  }
}