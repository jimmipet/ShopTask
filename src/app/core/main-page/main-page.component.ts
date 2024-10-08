import { Component } from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  imports: [CommonModule,CardListComponent]
})
export class MainPageComponent {
}
