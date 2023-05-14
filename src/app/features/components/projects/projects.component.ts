import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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

export class ProjectsComponent implements OnDestroy {
  title !: string
  content: any[] = []
  currentRoute = ''
  projectsSubscription!: Subscription

  constructor(public router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    this.projectsSubscription = this.translate.get('sections.projects').subscribe((data: any) => {
      this.title = data.title
      for (let key in data.content) {
        const project = data.content[key]
        let projectItem = {
          id: project.id,
          name: `sections.projects.content.${key}.name`,
          year: project.year,
          client: `sections.projects.content.${key}.client`,
          technologies: project.technologies.sort((a: string, b: string) => a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0)
        }
        this.content.push(projectItem)
      }
      // if (this.activeMenu()) {
      //   const index = this.desktopItems.findIndex((x) => x.shortcut === this.router.url.split('/')[2])
      //   console.log('dsds', index)
      //   this.updateSelection(index)
      // }
    })
  }

  updateSelection(event: any) {
    this.currentRoute = event.id
    this.router.navigate(['project/' + this.currentRoute], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe()
  }
}
