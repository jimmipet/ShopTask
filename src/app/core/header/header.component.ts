import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../utils/services/cart/cart.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public cartItemCount: number = 0;

  private readonly router: Router = inject(Router);
  private readonly cartService: CartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
  public navigateToMainPage(): void {
    this.router.navigate(['']);
  }

  public navigateToBusket(): void {
    this.router.navigate(['/busket']);
  }
  
}
