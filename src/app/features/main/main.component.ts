import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DesktopItem } from '../models/desktop-item';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

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
export class MainComponent implements OnInit, OnDestroy {
  desktopItems: DesktopItem[] = []
  currentItem!: DesktopItem
  currentTheme: string = 'theme-1'
  currentItemMenu: string[] = []
  itemsSubscription!: Subscription

  constructor(public router: Router, private route: ActivatedRoute, private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.itemsSubscription = this.translate.get('sections').subscribe((data: any) => {
      for (let key in data) {
        let desktopItem = {
          name: `sections.${key}.title`,
          type: data[key].type,
          route: data[key].route,
          shortcut: data[key].shortcut,
          menu: [`sections.${key}.menu`]
        }
        this.desktopItems.push(desktopItem)
      }
      if (this.activeMenu()) {
        const index = this.desktopItems.findIndex((x) => x.shortcut === this.router.url.split('/')[2])
        console.log('dsds', index)
        this.updateSelection(index)
      }
    })
  }

  ngOnInit(): void {
    this.document.body.classList.add(this.currentTheme)
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe()
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
