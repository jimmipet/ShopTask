import { Component, inject} from '@angular/core';
import { Observable} from 'rxjs';
import { CartItem } from '../../../../typing';
import { CartService } from '../../../utils/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CardListItemService } from '../../../utils/services/api/card-list-item.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [CommonModule, CartItemComponent],
})
export class CartComponent {
  
  public readonly cardListItemService: CardListItemService = inject(CardListItemService);
  public readonly cartItems$: Observable<CartItem[]> = this.cardListItemService.getProductCart();
  private readonly cartService: CartService = inject(CartService);
  public readonly totalSum$: Observable<number> = this.cartService.totalSum$
  
  public removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId)
  }

  public increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  public decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }
  
}
