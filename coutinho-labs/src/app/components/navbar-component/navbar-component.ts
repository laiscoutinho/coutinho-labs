import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {

  icons = { ArrowLeft };
  items: any[] = [];
  isSubPage = false;
  currentPageLabel = '';
  activeSection = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateFromRoute();
      });

    this.updateFromRoute();
  }

  updateFromRoute() {
    let currentRoute = this.route.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const data = currentRoute.snapshot.data;

    this.items = data['nav'] || [];

    this.isSubPage = this.router.url !== '/';
    this.currentPageLabel = this.getPageLabel(this.router.url);
  }

  getPageLabel(url: string): string {
    if (url.includes('laiscoutinho')) return 'laiscoutinho';
    return '';
  }

  goToLandingPage() {
    this.router.navigate(['/']);
  }

  handleClick(item: any) {
    if (item.id) {
      this.scrollTo(item.id);
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onScroll() {
    const sections = this.items.filter(i => i.id);

    for (let section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();

      if (rect.top <= 120 && rect.bottom >= 120) {
        this.activeSection = section.id;
      }
    }
  }

}
