import {
  Component, ElementRef, ViewChild,
  AfterViewInit, NgZone, Output, EventEmitter
} from '@angular/core';
import { PROJECTS_ITEMS } from '../../../types/projects.types';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit {

  @ViewChild('scrollRef') scrollRef!: ElementRef<HTMLElement>;
  @Output() projectsEnd = new EventEmitter<void>();    // último projeto, scroll down
  @Output() projectsStart = new EventEmitter<void>();  // primeiro projeto, scroll up

  projects = PROJECTS_ITEMS;
  activeProjectIndex = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // garante que começa no 1º card centralizado
    setTimeout(() => this.goToIndex(0, false), 50);
  }

  get isFirst() { return this.activeProjectIndex === 0; }
  get isLast()  { return this.activeProjectIndex === this.projects.length - 1; }

  prev() {
    if (this.isFirst) {
      this.projectsStart.emit();
      return;
    }
    this.goToIndex(this.activeProjectIndex - 1);
  }

  next() {
    if (this.isLast) {
      this.projectsEnd.emit();
      return;
    }
    this.goToIndex(this.activeProjectIndex + 1);
  }

  // chamado pelo landing-page via @ViewChild
  handleScroll(direction: 'up' | 'down'): boolean {
    // retorna false = evento consumido (fica na seção)
    // retorna true  = pode trocar de seção
    if (direction === 'down') {
      if (!this.isLast) {
        this.goToIndex(this.activeProjectIndex + 1);
        return false;
      }
      return true; // era o último, libera pra próxima seção
    } else {
      if (!this.isFirst) {
        this.goToIndex(this.activeProjectIndex - 1);
        return false;
      }
      return true; // era o primeiro, libera pra seção anterior
    }
  }

  goToIndex(index: number, _animate = true) {
    this.activeProjectIndex = index;
    this.applyTransforms();
  }

  applyTransforms() {
    const el = this.scrollRef?.nativeElement;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>('.project-card');

    const ANGLE_STEP = 40;   // graus entre cada card no arco
    const RADIUS = 600;      // raio do disco (quanto mais alto, mais suave a curva)

    cards.forEach((card, i) => {
      const offset = i - this.activeProjectIndex;
      const absOffset = Math.abs(offset);

      // limita a 3 cards visíveis de cada lado
      if (absOffset > 3) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        return;
      }

      const angleRad = (offset * ANGLE_STEP * Math.PI) / 180;

      // posição no arco: sin move X, (1 - cos) afunda em Z
      const translateX = Math.sin(angleRad) * RADIUS;
      const translateZ = -(1 - Math.cos(angleRad)) * RADIUS;

      // o card ativo fica reto, os laterais rotacionam apontando pro centro
      const rotateY = offset * ANGLE_STEP * 0.6; // 60% do ângulo — mais sutil

      const scale   = 1 - absOffset * 0.08;
      const opacity = 1 - absOffset * 0.3;

      card.style.transform = `
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${Math.max(scale, 0.65)})
      `;
      card.style.opacity = String(Math.max(opacity, 0.15));
      card.style.zIndex  = String(10 - absOffset);
      card.style.pointerEvents = absOffset === 0 ? 'all' : 'none';
    });
  }
}
