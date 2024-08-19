import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule]
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);

  public navigateToMainPage(): void {
    this.router.navigate(['']);
  }

  public navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}