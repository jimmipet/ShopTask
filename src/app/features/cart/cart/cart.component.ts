import { Component, inject, Input} from '@angular/core';
import { Observable, tap} from 'rxjs';
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
  @Input({ required: true }) cartItems!: CartItem[] | null;

  public cardListItemService: CardListItemService = inject(CardListItemService);
  public  cartItems$: Observable<CartItem[]> = this.cardListItemService.getProductCart();
  private readonly cartService = inject(CartService);
  
  public removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId)
  }

  public increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  public decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }
  //при удалении пока не обновляется
  public getTotalSum(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => sum + (item.price), 0);
  }
}
