import { Component, inject, Input, OnInit } from '@angular/core';
import Product from '../../../typing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CartService } from '../../utils/services/cart/cart.service';
import { CardListItemService } from '../../utils/services/api/card-list-item.service';

@Component({
  standalone: true,
  selector: 'app-about-card-list-item',
  templateUrl: './about-card-list-item.component.html',
  styleUrl: './about-card-list-item.component.scss',
  imports: [CommonModule]
})
export class AboutCardListItemComponent implements OnInit {
  @Input() cart$: Observable<Product> = of({} as Product);

  public product$: Observable<Product> | undefined;

  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly cardListItemService:CardListItemService = inject(CardListItemService);
  private readonly cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.cardListItemService.getProduct(id);
      })
    );
  }

  public addToCart(cart: Product): void {
    this.cartService.addToCart(cart);
  }

}
