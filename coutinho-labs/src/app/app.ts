import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout-component/layout-component';
import { AnimatedBgComponent } from './components/layout-component/components/animated-bg.component';
import { CursorDirective } from './components/layout-component/components/cursor.directive';

@Component({
  selector: 'app-root',
  imports: [AnimatedBgComponent, CursorDirective, LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('coutinho-labs');
}
