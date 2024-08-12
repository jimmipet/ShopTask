import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { MainPageComponent } from './features/main/main-page/main-page.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, MainPageComponent]
})
export class AppComponent {
}