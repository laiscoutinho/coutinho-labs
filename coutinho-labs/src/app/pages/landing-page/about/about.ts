import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonLinkComponent } from '../../../components/btns/button-link-component/button-link-component';

@Component({
  selector: 'app-about',
  imports: [ButtonLinkComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

  @Output() navigateTo = new EventEmitter<string>();

}
