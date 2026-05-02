import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowUpRight } from 'lucide-angular';

@Component({
  selector: 'app-button-link-component',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button-link-component.html',
  styleUrl: './button-link-component.scss',
})
export class ButtonLinkComponent {
  @Input() text: string = 'saiba mais';
  @Input() href: string = '#';
  @Input() external: boolean = false;
  @Output() navigateTo = new EventEmitter<string>();

  icons = { ArrowUpRight };

  get target(): string {
    return this.external ? '_blank' : '_self';
  }

  get rel(): string {
    return this.external ? 'noopener noreferrer' : '';
  }

  get isAnchor(): boolean {
    return this.href.startsWith('#');
  }

  handleClick(event: MouseEvent) {
    if (this.isAnchor) {
      event.preventDefault();
      this.navigateTo.emit(this.href.replace('#', ''));
    }
  }
}
