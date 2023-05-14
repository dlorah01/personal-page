import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/features/services/theme.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.sass'],
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
export class FolderComponent implements OnInit, OnDestroy {
  @Input() title!: string
  @Input() content!: any[]
  @Output() emitSelection: EventEmitter<any> = new EventEmitter()
  previous = ''
  order = true
  currentView = 'list'
  arrow = false
  currentTheme!: string
  themeSubscription!: Subscription

  constructor(private translate: TranslateService, private themeService: ThemeService) {
    this.themeService.themeSubject.subscribe( (data) => {
      console.log('data es', data)
    })
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.themeSubject.subscribe( (data) => {
      this.currentTheme = data
    })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe()
  }

  sortItems(criteria: string): void {
    console.log('criteria', criteria)
    const orderFunction = (a: any, b: any) => {
      if (['name', 'client'].includes(criteria)) {
        return this.order ? this.translate.instant(a[criteria]).localeCompare(this.translate.instant(b[criteria])) : this.translate.instant(b[criteria]).localeCompare(this.translate.instant(a[criteria]))
      }
      return this.order ? this.translate.instant(a[criteria]) - this.translate.instant(b[criteria]) : this.translate.instant(b[criteria]) - this.translate.instant(a[criteria])
    }
    if (this.previous === criteria) {
      this.order = !this.order
      this.arrow = !this.arrow
    }
    else {
      this.arrow = false
    }
    this.content = this.content.sort(orderFunction)
    this.previous = criteria
  }

  updateSelection(index: number) {
    this.emitSelection.emit(this.content[index])
  }

  changeView(view: string): void {
    this.currentView = view
  }
}
