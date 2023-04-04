import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-desktop-item',
  templateUrl: './desktop-item.component.html',
  styleUrls: ['./desktop-item.component.sass']
})
export class DesktopItemComponent {
  @Input() name !: string
  @Input() type !: string

  constructor() {}
}
