import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.2s {{delay}}s ease-out',
                    style({ opacity: 1}))
          ], {params: {delay: '0'}}
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.2s ease-in',
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class ProjectsComponent {
  title !: string
  content!: any[]
  maximizeWindow: boolean = false
  currentRoute = 'default'
  x = 0

  constructor(public router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    this.title = 'sections.projects.title'
    this.content = [
      {
        name: "sections.projects.content.project-1.name",
        url: "sections.projects.content.project-1.url",
        client: "sections.projects.content.project-1.client",
        year: "sections.projects.content.project-1.year",
        description: "sections.projects.content.project-1.name",
      },
      {
        name: "sections.projects.content.project-2.name",
        url: "sections.projects.content.project-2.url",
        client: "sections.projects.content.project-2.client",
        year: "sections.projects.content.project-2.year",
        description: "sections.projects.content.project-2.name",
      },
      {
        name: "sections.projects.content.project-3.name",
        url: "sections.projects.content.project-3.url",
        client: "sections.projects.content.project-3.client",
        year: "sections.projects.content.project-3.year",
        description: "sections.projects.content.project-3.name",
      }
    ]
  }

  closeWindow(): void {
    this.maximizeWindow = false
    this.router.navigate(['/projects'], {relativeTo: this.route})
    console.log('url', this.router.url)
  }

  resizeWindow(value: boolean): void {
    this.maximizeWindow = value
  }

  updateSelection(event: any) {
    this.currentRoute = event.year
    this.router.navigate(['project/' + this.currentRoute], {relativeTo: this.route})
  }
}
