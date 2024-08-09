import { Component, inject } from '@angular/core';
import { CardListItemComponent } from "../../features/card-list-item/card-list-item.component";
import { CardListItemService } from '../../api/card-list-item.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import Product from '../../../typing';

@Component({
  standalone: true,
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  imports: [CardListItemComponent, AsyncPipe]
})
export class CardListComponent {

  private readonly cardListItemService: CardListItemService = inject(CardListItemService)
  
  public readonly products$: Observable<Product[]>= this.cardListItemService.getProducts();
  
}
