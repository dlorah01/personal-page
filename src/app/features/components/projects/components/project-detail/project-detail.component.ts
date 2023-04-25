import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.sass']
})
export class ProjectDetailComponent implements OnDestroy {
  project: any = {}
  projectSubscription!: Subscription

  constructor(public router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    const projectId  = this.router.url.split('/')[4]
    this.projectSubscription = this.translate.get('sections.projects.content').subscribe((data: any) => {
      for (let key in data) {
        const project = data[key]
        let projectItem = {
          id: project.id,
          name: `sections.projects.content.${key}.name`,
          url: project.url,
          client: `sections.projects.content.${key}.client`,
          year: project.year,
          description: `sections.projects.content.${key}.description`,
          framework: project.framework,
          technologies: project.technologies,
          topics: `sections.projects.content.${key}.topics`,
        }
        if (projectItem.id === projectId) this.project = projectItem
      }
    })
  }


  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe()
  }


  getImageSrc(): string {
    const v  = "n"
    return `../../../../assets/images/projects/image-project-${v}.jpg`;
  }

  routeToLink(url: string): void {
    window.open(url, "_blank");
  }
}
