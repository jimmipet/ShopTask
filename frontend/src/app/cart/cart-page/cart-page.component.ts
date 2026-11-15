import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { ApiErrorPipe } from '../../core/api-error.pipe';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-cart-page',
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
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export default class CartPageComponent {
  protected readonly cart = inject(CartStore);
}
