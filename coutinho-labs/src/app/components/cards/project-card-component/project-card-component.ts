import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MoveUpRight } from 'lucide-angular';
import { ProjectsType } from '../../../types/projects.types';

@Component({
  selector: 'app-project-card-component',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './project-card-component.html',
  styleUrl: './project-card-component.scss',
})
export class ProjectCardComponent {

  /** Quando undefined → exibe skeleton automaticamente */
  @Input() project?: ProjectsType;

  /** Força skeleton mesmo com project preenchido */
  @Input() loading = false;

  icons = { MoveUpRight };

  imageLoaded = false;
  imageError  = false;

  get isLoading()    { return this.loading || !this.project; }

  get hasImage()     { return !!this.project?.imageUrl && !this.imageError; }
  get hasDesc()      { return !!this.project?.description; }
  get hasLanguages() { return !!this.project?.languages?.length; }
  get hasTools()     { return !!this.project?.tools?.length; }
  get hasLink()      { return !!this.project?.link; }
  get hasArticles()  { return !!this.project?.articles?.length; }

  onImageLoad()  { this.imageLoaded = true; }
  onImageError() { this.imageError  = true; this.imageLoaded = true; }
}
