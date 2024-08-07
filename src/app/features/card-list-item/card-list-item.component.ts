import { Component, Input } from '@angular/core';
import Product from '../../../typing';

@Component({
  selector: 'app-card-list-item',
  standalone: true,
  imports: [],
  templateUrl: './card-list-item.component.html',
  styleUrl: './card-list-item.component.scss'
})
export class CardListItemComponent {
  @Input() product!: Product;
}
