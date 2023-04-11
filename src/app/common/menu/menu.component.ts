import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  @Input() content !: any[]

  constructor(private translate: TranslateService) {}

  downloadItem(): void {
    let variable = this.translate.instant('cv')
    window.open(`/assets/pdfs/${variable}-Harold-Garcia-2023.pdf`, '_blank');
  }
}
