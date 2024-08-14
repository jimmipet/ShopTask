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
  private readonly cartService = inject(CartService);
  private readonly router: Router = inject(Router);
  public readonly cartItemCount$: Observable<number> = this.cartService.getCartItemCount(); 

  public navigateToMainPage(): void {
    this.router.navigate(['']);
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}