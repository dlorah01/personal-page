import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.sass']
})
export class OutlookComponent {
  @Input() title!: string
  @Input() content: any[] = []

}
