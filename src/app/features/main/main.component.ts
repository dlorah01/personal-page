import { Component, Inject } from '@angular/core';
import { DesktopItem } from '../models/desktop-item';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  desktopItems !: DesktopItem[]
  maximizeWindow: boolean = false
  currentItem!: DesktopItem
  currentTheme: string = 'theme-1'

  constructor(public router: Router, private route: ActivatedRoute, private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.desktopItems = [
      {
        name: "sections.about.title",
        type: 'doc',
        route: '/main/about',
        program: 'Word'
      },
      {
        name: 'sections.projects.title',
        type: 'app',
        route: '/main/projects',
        program: 'Folder'
      },
      {
        name: 'sections.projects.title',
        type: 'iml',
        route: '/main/contact',
        program: 'Mail'
      },
    ]
    this.document.body.classList.add(this.currentTheme)
  }

  closeWindow(): void {
    this.maximizeWindow = false
    this.router.navigate([''], {relativeTo: this.route})
  }

  resizeWindow(value: boolean): void {
    this.maximizeWindow = value
  }

  updateSelection(index: number): void {
    this.currentItem = this.desktopItems[index]
  }

  updateTheme(selection: string) {
    this.document.body.classList.replace(this.currentTheme, selection)
    this.currentTheme = selection
  }

  updateLanguage(selection: any) {
    console.log('selecion', selection)
    this.translate.use(selection)
  }
}
