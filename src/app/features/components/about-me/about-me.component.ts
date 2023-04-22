import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass'],
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
export class AboutMeComponent {
  title !: string
  content!: any[]

  constructor(private router: Router, private route: ActivatedRoute) {
    this.title = 'sections.about.title'
    this.content = [
      {
        subtitle: "sections.about.profile",
        content: [
          "sections.about.content.paragraph-1",
          "sections.about.content.paragraph-2",
          "sections.about.content.paragraph-3"
        ]
      },
      {
        subtitle: "sections.about.education",
        content: [
          [
            "sections.about.degrees.degree-1.name",
            "sections.about.degrees.degree-1.bacherol",
            "sections.about.degrees.degree-1.unversity",
            "sections.about.degrees.degree-1.date-start",
            "sections.about.degrees.degree-1.date-end",
            "sections.about.degrees.degree-1.date-graduation"
        ],
          [
            "sections.about.degrees.degree-2.name",
            "sections.about.degrees.degree-2.bacherol",
            "sections.about.degrees.degree-2.unversity",
            "sections.about.degrees.degree-2.date-start",
            "sections.about.degrees.degree-2.date-end",
            "sections.about.degrees.degree-2.date-graduation"
          ]
        ]
      }
    ]
  }

  closeWindow(): void {
    this.router.navigate([''], {relativeTo: this.route})
  }
}
