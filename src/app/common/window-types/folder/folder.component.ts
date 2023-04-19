import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.sass']
})
export class FolderComponent {
  @Input() title!: string
  @Input() content!: any[]
  @Output() emitSelection: EventEmitter<any> = new EventEmitter()
  previous = ''
  order = true

  constructor(private translate: TranslateService) {}

  sortItems(criteria: string): void {
    const orderFunction = (a: any, b: any) => {
      if (criteria === 'name') {
        return this.order ? this.translate.instant(a[criteria]).localeCompare(this.translate.instant(b[criteria])) : this.translate.instant(b[criteria]).localeCompare(this.translate.instant(a[criteria]))
      }
      return this.order ? this.translate.instant(a[criteria]) - this.translate.instant(b[criteria]) : this.translate.instant(b[criteria]) - this.translate.instant(a[criteria])
    }
    if (this.previous === criteria) this.order = !this.order
    this.content = this.content.sort(orderFunction)
    this.previous = criteria
  }

  updateSelection(index: number) {
    this.emitSelection.emit(this.content[index])
  }
}
