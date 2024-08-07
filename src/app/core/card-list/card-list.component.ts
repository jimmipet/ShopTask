import { Component, inject } from '@angular/core';
import { CardListItemComponent } from "../../features/card-list-item/card-list-item.component";
import { CardListItemService } from '../../api/cardListItem.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardListItemComponent, AsyncPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  private readonly cardListItemService = inject(CardListItemService)
  
  public products$ = this.cardListItemService.getProducts();
  
}
