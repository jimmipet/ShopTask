import { HttpClient, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Cart, CartItem } from './cart.model';

const CART_URL = `${environment.apiBaseUrl}/cart`;
const EMPTY_CART: Cart = { items: [], totalQuantity: 0, totalPrice: 0 };

@Service()
export class CartStore {
  private readonly http = inject(HttpClient);
  private readonly isSending = signal(false);

  public readonly resource = httpResource<Cart>(() => CART_URL, { defaultValue: EMPTY_CART });

  public readonly data = computed(() =>
    this.resource.hasValue() ? this.resource.value() : EMPTY_CART,
  );

  public readonly isBusy = computed(() => this.isSending() || this.resource.isLoading());

  public add(productId: number): void {
    const quantity = this.data().items.find((item) => item.productId === productId)?.quantity ?? 0;
    this.send('PUT', productId, { quantity: quantity + 1 });
  }

  public decrease({ productId, quantity }: CartItem): void {
    if (quantity > 1) {
      this.send('PUT', productId, { quantity: quantity - 1 });
    } else {
      this.remove(productId);
    }
  }

  public remove(productId: number): void {
    this.send('DELETE', productId);
  }

  private send(method: 'PUT' | 'DELETE', productId: number, body?: object): void {
    this.isSending.set(true);
    this.http
      .request<Cart>(method, `${CART_URL}/items/${productId}`, { body })
      .pipe(
        finalize(() => {
          this.isSending.set(false);
        }),
      )
      .subscribe((cart) => {
        this.resource.set(cart);
      });
  }
}
