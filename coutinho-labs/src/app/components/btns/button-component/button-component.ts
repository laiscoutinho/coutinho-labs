import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {

  @Input() variant: 'lavanda' | 'white' = 'lavanda';
  @Input() fullWidth = false;

}
