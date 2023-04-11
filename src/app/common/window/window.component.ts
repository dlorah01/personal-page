import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.sass']
})
export class WindowComponent {
  maximize: boolean = false
  name !: string
  program !: string
  @Output() onClose:  EventEmitter<void> = new EventEmitter()
  @Output() onSizeChange:  EventEmitter<boolean> = new EventEmitter()

  constructor(public router: Router) {
    const url = this.router.url.split('/')
    const lastUrl = url[url.length - 1]
    switch(lastUrl) {
      case 'about': {
        this.name = 'sections.about.title'
        this.program = 'sections.about.program'
        break
      }
      case 'projects': {
        this.name = 'sections.projects.title'
        this.program = 'sections.projects.program'
        break
      }
      case 'contact': {
        this.name = 'sections.email.title'
        this.program = 'sections.email.program'
        break
      }
    }
  }

  closeWindow(): void {
    this.onClose.emit()
  }

  maximizeWindow(): void {
    this.maximize = true
    this.onSizeChange.emit(true)
  }

  minimizeWindow(): void {
    this.maximize = false
    this.onSizeChange.emit(false)
  }

}
