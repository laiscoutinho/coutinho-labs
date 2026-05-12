import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../components/btns/button-component/button-component';

@Component({
  selector: 'app-hero-section',
  imports: [ButtonComponent],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {

  @Output() navigateTo = new EventEmitter<string>();

  scrolled = false;

  goToProjects() {
    this.navigateTo.emit('projects');
  }

  goToContact() {
    this.navigateTo.emit('contact');
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 80;
  }

}
