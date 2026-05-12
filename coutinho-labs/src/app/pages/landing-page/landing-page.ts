import { Component, NgZone, OnInit, OnDestroy, inject } from '@angular/core';
import { LucideAngularModule, Mail } from 'lucide-angular';
import { HeroSection } from './hero-section/hero-section';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';
import { Founder } from './founder/founder';
import { Questions } from './questions/questions';

@Component({
  selector: 'app-landing-page',
  imports: [LucideAngularModule, HeroSection, About, Founder, Projects, Questions, Contact],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit, OnDestroy {

  icons = { Mail };

  // IDs das seções na ordem em que aparecem no DOM
  private readonly SECTION_IDS = [
    'home',
    'about',
    'about-founder',
    'projects',
    'questions',
    'contact',
  ];

  private isScrolling = false;
  private readonly SCROLL_COOLDOWN = 800;
  private wheelListener!: (e: WheelEvent) => void;
  private zone = inject(NgZone);

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.wheelListener = (e: WheelEvent) => this.onWheel(e);
      window.addEventListener('wheel', this.wheelListener, { passive: true });
    });
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', this.wheelListener);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private onWheel(e: WheelEvent) {
    if (this.isScrolling) return;

    const current = this.getMostVisibleSection();
    if (current === -1) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const target    = current + direction;

    if (target < 0 || target >= this.SECTION_IDS.length) return;

    const targetEl = document.getElementById(this.SECTION_IDS[target]);
    if (!targetEl) return;
    if (!this.isSectionWellAligned(this.SECTION_IDS[current])) return;

    this.isScrolling = true;
    this.zone.run(() => {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    setTimeout(() => {
      this.isScrolling = false;
    }, this.SCROLL_COOLDOWN);
  }

  private getMostVisibleSection(): number {
    let bestIdx     = -1;
    let bestVisible = 0;
    const vh = window.innerHeight;

    this.SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      if (visible > bestVisible) {
        bestVisible = visible;
        bestIdx     = i;
      }
    });

    return bestIdx;
  }

  private isSectionWellAligned(id: string): boolean {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect    = el.getBoundingClientRect();
    const vh      = window.innerHeight;
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    return visible / vh >= 0.6;
  }
}
