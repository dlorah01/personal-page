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
    this.title = 'About me'
    this.content = [
      'I am a web and mobile frontend developer passionate about the development of truly useful and enjoyable technological solutions for end users.',
      'At a professional level I have great interest and knowledge focused on the development of web and mobile applications, focused on always offering a pleasant and attractive experience to end users who interact with the product.',
      'Thus, the technical and structural knowledge provided by Systems and Computing Engineering, together with the aesthetic and experimental knowledge provided by Design, allow for truly innovate ideas to materi- alize'
    ]
  }
}
