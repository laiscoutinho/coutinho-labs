import { Component, Input, ElementRef, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { LucideAngularModule, MoveUpRight } from 'lucide-angular';

export type ButtonLinkVariant = 'white' | 'outline';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [NgClass, LucideAngularModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent implements AfterViewInit, OnDestroy {

  @Input() href     = '#';
  @Input() variant: ButtonLinkVariant = 'white';
  @Input() external = false;
  @Input() full     = false;
  @Input() showIcon = true;

  icons = { MoveUpRight };

  private btnEl!: HTMLAnchorElement;
  private mouseMoveHandler!: (e: MouseEvent) => void;
  private clickHandler!:     (e: MouseEvent) => void;

  constructor(private elRef: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit() {
    this.btnEl = this.elRef.nativeElement.querySelector('.btn')!;
    if (!this.btnEl || this.variant !== 'white') return;

    this.zone.runOutsideAngular(() => {
      this.mouseMoveHandler = (e: MouseEvent) => {
        const rect = this.btnEl.getBoundingClientRect();
        const px = (((e.clientX - rect.left) / rect.width)  * 100).toFixed(1) + '%';
        const py = (((e.clientY - rect.top)  / rect.height) * 100).toFixed(1) + '%';
        this.btnEl.style.setProperty('--btn-mx', px);
        this.btnEl.style.setProperty('--btn-my', py);
      };

      this.clickHandler = (e: MouseEvent) => {
        const rect   = this.btnEl.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height) * 1.6;
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
        this.btnEl.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      };

      this.btnEl.addEventListener('mousemove', this.mouseMoveHandler);
      this.btnEl.addEventListener('click',     this.clickHandler);
    });
  }

  ngOnDestroy() {
    this.btnEl?.removeEventListener('mousemove', this.mouseMoveHandler);
    this.btnEl?.removeEventListener('click',     this.clickHandler);
  }

  get target()  { return this.external ? '_blank' : '_self'; }
  get rel()     { return this.external ? 'noopener noreferrer' : null; }
  get classes() {
    return {
      'btn':          true,
      'btn--white':   this.variant === 'white',
      'btn--outline': this.variant === 'outline',
      'btn--full':    this.full,
    };
  }
}
