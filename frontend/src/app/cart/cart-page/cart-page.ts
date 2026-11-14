import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { ApiErrorPipe } from '../../core/api';
import { CartStore } from '../cart-store';

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
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export default class CartPage {
  protected readonly cart = inject(CartStore);
}
