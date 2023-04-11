import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass']
})
export class AboutMeComponent {
  title !: string
  content!: any[]

  constructor() {
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
}
