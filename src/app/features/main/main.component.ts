import { Component } from '@angular/core';
import { DesktopItem } from '../models/desktop-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  desktopItems !: DesktopItem[]
  maximizeWindow: boolean = false
  currentItem!: DesktopItem

  constructor(public router: Router, private route: ActivatedRoute) {
    this.desktopItems = [
      {
        name: 'About me',
        type: 'doc',
        route: '/main/about',
        program: 'Word'
      },
      {
        name: 'Projects',
        type: 'app',
        route: '/main/projects',
        program: 'Folder'
      },
      {
        name: 'Email',
        type: 'iml',
        route: '/main/contact',
        program: 'Mail'
      },
    ]
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
}
