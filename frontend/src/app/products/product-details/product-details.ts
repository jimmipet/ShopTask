import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../cart/cart-store';
import { ApiErrorPipe } from '../../core/api';
import { ProductsApi } from '../products-api';

@Component({
  selector: 'app-product-details',
  imports: [
    RouterLink,
    CurrencyPipe,
    ApiErrorPipe,
    MatButton,
    MatIcon,
    MatCard,
    MatProgressSpinner,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails {
  private readonly api = inject(ProductsApi);
  protected readonly cart = inject(CartStore);
  public readonly id = input.required<string>();
  protected readonly product = this.api.get(this.id);
}
