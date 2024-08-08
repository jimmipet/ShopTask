import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { MainPageComponent } from './core/main-page/main-page.component';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, MainPageComponent]
})
export class AppComponent {
}
