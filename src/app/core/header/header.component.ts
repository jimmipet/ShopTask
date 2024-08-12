import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../utils/services/cart/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule]
})
export class HeaderComponent {
  
  public readonly cartItemCount$: Observable<number> = inject(CartService).cartItemCount$;
  private readonly router = inject(Router);

  public navigateToMainPage(): void {
    this.router.navigate(['']);
  }

  public navigateToBusket(): void {
    this.router.navigate(['/busket']);
  }
}