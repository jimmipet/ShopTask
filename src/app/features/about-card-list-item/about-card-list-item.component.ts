import { Component, inject, Input } from '@angular/core';
import Product from '../../../typing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CartService } from '../../utils/services/cart/cart.service';
import { CardListItemService } from '../../utils/services/api/card-list-item.service';

@Component({
  standalone: true,
  selector: 'app-about-card-list-item',
  templateUrl: './about-card-list-item.component.html',
  styleUrl: './about-card-list-item.component.scss', 
  imports: [CommonModule]
})
export class AboutCardListItemComponent {

  public readonly product$: Observable<Product>;
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly cardListItemService: CardListItemService = inject(CardListItemService);
  private readonly cartService: CartService = inject(CartService);

  constructor() {
    this.product$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.cardListItemService.getProduct(id);
      })
    );
  }

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

}