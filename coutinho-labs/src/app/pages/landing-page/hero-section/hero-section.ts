import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../components/btns/button-component/button-component';


@Component({
  selector: 'app-hero-section',
  imports: [ButtonComponent],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})

export class HeroSection {

  @Output() navigateTo = new EventEmitter<string>();

  goToProjects() {
    this.navigateTo.emit('projects');
  }

  goToContact() {
    this.navigateTo.emit('contact');
  }

}
