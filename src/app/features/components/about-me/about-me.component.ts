import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass']
})
export class AboutMeComponent {
  title !: string
  content!: string[]

  constructor() {
    this.title = 'sections.about.title'
    this.content = [
      "sections.about.content.paragraph-1",
      "sections.about.content.paragraph-2",
      "sections.about.content.paragraph-3"
    ]
  }
}
