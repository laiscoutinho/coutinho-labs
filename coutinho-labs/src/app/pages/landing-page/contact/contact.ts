import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/btns/button-component/button-component';
import { LucideAngularModule, Zap, Lock } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  imports: [ButtonComponent, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  items = { Zap, Lock };
}
