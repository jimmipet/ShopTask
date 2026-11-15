import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../cart/cart.store';
import { ApiErrorPipe } from '../../core/api-error.pipe';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  imports: [
    RouterLink,
    CurrencyPipe,
    ApiErrorPipe,
    MatButton,
    MatIconButton,
    MatIcon,
    MatCard,
    MatProgressSpinner,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export default class ProductListComponent {
  protected readonly cart = inject(CartStore);
  protected readonly products = inject(ProductsService).list();
  protected readonly query = signal('');

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.products.value().filter((product) => product.title.toLowerCase().includes(query));
  });
}
