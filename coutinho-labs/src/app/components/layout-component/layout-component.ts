import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer-component/footer-component';
import { NavbarComponent } from '../navbar-component/navbar-component';
import { LandingPage } from '../../pages/landing-page/landing-page';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss',
})
export class LayoutComponent {}
