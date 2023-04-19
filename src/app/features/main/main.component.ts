import { Component, Inject } from '@angular/core';
import { DesktopItem } from '../models/desktop-item';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
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
export class MainComponent {
  desktopItems !: DesktopItem[]
  maximizeWindow: boolean = false
  currentItem!: DesktopItem
  currentTheme: string = 'theme-1'
  currentItemMenu: string[] = []

  constructor(public router: Router, private route: ActivatedRoute, private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.desktopItems = [
      {
        name: "sections.about.title",
        type: 'doc',
        route: '/main/about',
        shortcut: 'about',
        menu: ['sections.about.menu']
      },
      {
        name: 'sections.projects.title',
        type: 'app',
        route: '/main/projects',
        shortcut: 'projects',
        menu: ['sections.projects.menu']
      },
      {
        name: 'sections.email.title',
        type: 'iml',
        route: '/main/contact',
        shortcut: 'contact',
        menu: ['sections.email.menu']
      },
    ]
    this.document.body.classList.add(this.currentTheme)
    if (this.activeMenu()) {
      console.log(this.router.url.split('/'))
      const index = this.desktopItems.findIndex((x) => x.shortcut === this.router.url.split('/')[2])
      this.updateSelection(index)
    }
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
    this.currentItemMenu = this.currentItem.menu
  }

  updateTheme(selection: string) {
    this.document.body.classList.replace(this.currentTheme, selection)
    this.currentTheme = selection
  }

  updateLanguage(selection: any) {
    this.translate.use(selection)
  }

  activeMenu(): boolean {
    return this.router.url !== '/main' ? true : false
  }
}
