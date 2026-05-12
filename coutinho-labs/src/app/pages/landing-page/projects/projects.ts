import { Component, AfterViewInit, NgZone, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { PROJECTS_ITEMS } from '../../../types/projects.types';
import { ProjectCardComponent } from '../../../components/cards/project-card-component/project-card-component';
import { ButtonComponent } from '../../../components/btns/button-component/button-component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, LucideAngularModule, ButtonComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit {

  readonly allProjects      = PROJECTS_ITEMS;
  readonly showcaseProjects = this.allProjects.slice(0, 3);
  readonly hiddenCount      = Math.max(0, this.allProjects.length - 3);

  isLoading = true;
  icons = { ArrowRight };

  @ViewChildren('card') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => this.bindCardListeners(), 50);
    }, 800);
  }

  private bindCardListeners() {
    this.cardRefs.forEach((ref) => {
      const el = ref.nativeElement;
      this.zone.runOutsideAngular(() => {

        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
          const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
          // hover: endireita + leve tilt responsivo ao mouse
          const rX   = (-dy * 5).toFixed(2);
          const rY   = ( dx * 5).toFixed(2);
          el.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.03)`;
          // luz interna segue o mouse
          const px = (((e.clientX - rect.left) / rect.width)  * 100).toFixed(1) + '%';
          const py = (((e.clientY - rect.top)  / rect.height) * 100).toFixed(1) + '%';
          el.style.setProperty('--mx', px);
          el.style.setProperty('--my', py);
        });

        el.addEventListener('mouseleave', () => {
          // volta ao tilt padrão (definido pelo CSS via --tilt-x/y)
          const tx = el.dataset['tiltX'] ?? '0';
          const ty = el.dataset['tiltY'] ?? '0';
          el.style.transform = `perspective(900px) rotateX(${tx}deg) rotateY(${ty}deg) scale(1)`;
        });
      });
    });
  }
}
