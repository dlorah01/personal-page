import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
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
export class FolderComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() title!: string
  @Input() content!: any[]
  searchContent: any[] = []
  @Output() emitSelection: EventEmitter<any> = new EventEmitter()
  @ViewChild('search') search!: ElementRef
  previous = ''
  order = true
  currentView = 'list'
  arrow = false
  currentTheme!: string
  themeSubscription!: Subscription

  constructor(private translate: TranslateService, private themeService: ThemeService) {}

  ngOnInit(): void {
    console.log('conte', this.content)
    this.content.forEach((x) => {
      console.log('hola', x)
    })
    this.themeSubscription = this.themeService.themeSubject.subscribe( (data) => {
      this.currentTheme = data
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
     setTimeout(() => {
      console.log(changes['content'].currentValue)
      this.searchContent = changes['content'].currentValue

     });
    }
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement,'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(150),
                distinctUntilChanged(),
                tap((text) => {
                  console.log('text', text)
                  let texts = (this.search.nativeElement.value || '').toLowerCase()
                  this.searchContent = this.content.filter((x) => this.translate.instant(x.name).toLowerCase().includes(texts))
                  // this.isClean = false
                  // this.searchArray = this.championsArray.filter((x) => x.id.toLowerCase().includes(texts))
                })
            )
            .subscribe();
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

  clearField(): void {
    this.search.nativeElement.value = ''
    this.searchContent = [...this.content]
  }
}
