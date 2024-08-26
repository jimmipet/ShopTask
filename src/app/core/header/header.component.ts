import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../utils/services/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule]
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);
  private readonly cartService: CartService = inject(CartService);
  public readonly quantity$: Observable<number> = this.cartService.quantity$;

  public navigateToMainPage(): void {
    this.router.navigate(['']);
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}