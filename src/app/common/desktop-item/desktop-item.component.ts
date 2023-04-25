import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-desktop-item',
  templateUrl: './desktop-item.component.html',
  styleUrls: ['./desktop-item.component.sass']
})
export class DesktopItemComponent {
  @Input() name !: string
  @Input() type !: string
  @Input() currentTheme !: string

  constructor() {}

  get imageSrc(): string {
    return `../../../../assets/icons/icon-${this.type}-${this.currentTheme}.svg`;
  }
}
