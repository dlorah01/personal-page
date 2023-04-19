import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

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
    this.router.events.subscribe((data) => {
      let value = data
     console.log('value', value)
    })
    console.log('la ruta', this.router.url)
    const url = this.router.url.split('/')
    const lastUrl = url[2]

    if (lastUrl === 'about') {
      this.name = 'sections.about.title'
      this.program = 'sections.about.program'
    }
    else if (lastUrl === 'projects') {
      if (url[3]) {
        this.name = 'sections.projects.detail-title'
        this.program = 'sections.projects.detail-program'
      }
      else {
        this.name = 'sections.projects.title'
        this.program = 'sections.projects.program'
      }
    }
    else if (lastUrl === 'contact') {
      this.name = 'sections.email.title'
      this.program = 'sections.email.program'
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
