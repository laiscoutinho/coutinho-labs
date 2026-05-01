import { Component, HostListener, ViewChild } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';
import { Founder } from './founder/founder';
import { Questions } from './questions/questions';

@Component({
  selector: 'app-landing-page',
  imports: [HeroSection, About, Founder, Projects, Questions, Contact],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

  @ViewChild(Projects) projectsComponent!: Projects;

  private isScrolling = false;

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getCurrentSectionIndex(sections: NodeListOf<Element>): number {
    let index = 0;
    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) index = i;
    });
    return index;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const sections = document.querySelectorAll('.section');
    const current = this.getCurrentSectionIndex(sections);
    const currentSection = sections[current] as HTMLElement;
    const isProjects = currentSection.id === 'projects';
    const direction = event.deltaY > 0 ? 'down' : 'up';

    // delega pro componente de projetos
    if (isProjects && this.projectsComponent) {
      const canLeave = this.projectsComponent.handleScroll(direction);
      if (!canLeave) {
        event.preventDefault();
        return;
      }
    }

    if (this.isScrolling) return;
    event.preventDefault();
    this.isScrolling = true;

    let nextIndex = current;
    if (direction === 'down') {
      nextIndex = Math.min(current + 1, sections.length - 1);
    } else {
      nextIndex = Math.max(current - 1, 0);
    }

    (sections[nextIndex] as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => { this.isScrolling = false; }, 700);
  }
}
