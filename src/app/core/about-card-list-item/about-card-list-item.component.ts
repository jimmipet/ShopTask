import { Component, inject, OnInit } from '@angular/core';
import Product from '../../../typing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardListItemService } from '../../api/card-list-item.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-about-card-list-item',
  templateUrl: './about-card-list-item.component.html',
  styleUrl: './about-card-list-item.component.scss',
  imports: [CommonModule]
})
export class AboutCardListItemComponent implements OnInit {
  public product$: Observable<Product> | undefined;

  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly cardListItemService:CardListItemService = inject(CardListItemService);


  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.cardListItemService.getProduct(id);
      })
    );
  }
}
