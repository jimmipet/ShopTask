import { Component, inject, Input } from '@angular/core';
import Product from '../../../typing';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-card-list-item',
  templateUrl: './card-list-item.component.html',
  styleUrl: './card-list-item.component.scss',
  imports: [RouterOutlet],
})
export class CardListItemComponent {
  @Input({required: true}) product!: Product;

  private readonly router: Router = inject(Router);

  public navigateToProductDetail() {
    this.router.navigate(['/card-list-item', this.product.id], { state: { product: this.product } });
  }
}
