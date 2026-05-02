import { Directive, OnInit, OnDestroy,
  Renderer2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({ selector: '[appCursor]', standalone: true })
export class CursorDirective implements OnInit, OnDestroy {
  private doc = inject(DOCUMENT);
  private r2 = inject(Renderer2);

  private outer!: HTMLElement;
  private inner!: HTMLElement;
  private mx = 0; private my = 0;
  private cx = 0; private cy = 0;
  private raf = 0;
  private onMove!: () => void;

  ngOnInit() {
    this.build();
    this.onMove = this.r2.listen('document', 'mousemove', (e: MouseEvent) => {
      this.mx = e.clientX;
      this.my = e.clientY;
    });
    this.loop();

    // Efeito hover em links/buttons
    this.r2.listen('document', 'mouseover', (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a,button,[data-cursor]');
      if (!t) return;
      this.outer.classList.add('is-hover');
      if ((t as HTMLElement).dataset['cursor'] === 'card') {
        this.outer.classList.add('is-card');
      }
    });

    this.r2.listen('document', 'mouseout', (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a,button,[data-cursor]');
      if (!t) return;
      this.outer.classList.remove('is-hover');
      this.outer.classList.remove('is-card');
    });
  }

  private build() {
    const style = this.doc.createElement('style');
    style.textContent = `
      * { cursor: none !important; }

      #cl-cursor-outer {
        position: fixed; top: 0; left: 0; pointer-events: none;
        z-index: 99999; width: 32px; height: 32px;
        border: 1.5px solid #7F77DD; border-radius: 50%;
        transform: translate(-50%,-50%);
        transition: width .2s, height .2s, border-color .2s, opacity .2s;
        will-change: transform;
      }
      #cl-cursor-outer.is-hover {
        width: 48px; height: 48px; border-color: #3D3B8E;
      }

      #cl-cursor-outer.is-card {
        width: 44px; height: 44px;
        border-radius: 10px;
        border-color: #7F77DD;
        background: rgba(127, 119, 221, 0.08);
      }

      #cl-cursor-inner {
        position: fixed; top: 0; left: 0; pointer-events: none;
        z-index: 99999; width: 6px; height: 6px;
        background: #7F77DD; border-radius: 50%;
        transform: translate(-50%,-50%);
        will-change: transform;
        transition: opacity .15s;
        box-shadow: 0 0 12px #7F77DD, 0 0 24px rgba(127,119,221,0.6);
      }
    `;
    this.doc.head.appendChild(style);

    this.outer = this.doc.createElement('div');
    this.outer.id = 'cl-cursor-outer';
    this.inner = this.doc.createElement('div');
    this.inner.id = 'cl-cursor-inner';
    this.doc.body.appendChild(this.outer);
    this.doc.body.appendChild(this.inner);
  }

  private loop() {
    // Lag suave no anel externo
    this.cx += (this.mx - this.cx) * 0.12;
    this.cy += (this.my - this.cy) * 0.12;

    this.outer.style.transform =
      `translate(calc(-50% + ${this.cx}px), calc(-50% + ${this.cy}px))`;
    this.inner.style.transform =
      `translate(calc(-50% + ${this.mx}px), calc(-50% + ${this.my}px))`;

    this.raf = requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    this.onMove();
    this.outer.remove();
    this.inner.remove();
  }
}
