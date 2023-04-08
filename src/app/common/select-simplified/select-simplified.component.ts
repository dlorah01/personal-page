import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-simplified',
  templateUrl: './select-simplified.component.html',
  styleUrls: ['./select-simplified.component.sass']
})
export class SelectSimplifiedComponent {
  @Input() options !: any[]
  @Input() label !: any
  @Input() key !: any
  @Output() emitValue: EventEmitter<string> = new EventEmitter()

  emitSelection(selection: HTMLSelectElement): void {
    this.emitValue.emit(selection.value)
  }
}
