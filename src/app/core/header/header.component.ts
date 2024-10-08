import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly router: Router = inject(Router);

  public navigateToMainPage() {
    this.router.navigate(['']);
  }
  
}
