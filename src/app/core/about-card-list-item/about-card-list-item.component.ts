import { Component, OnInit } from '@angular/core';
import Product from '../../../typing';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about-card-list-item',
  templateUrl: './about-card-list-item.component.html',
  styleUrl: './about-card-list-item.component.scss',
  imports: [CommonModule]
})
export class AboutCardListItemComponent implements OnInit {
  product: Product | undefined;

  ngOnInit(): void {
      this.product = history.state.product;
  }
}
