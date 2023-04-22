import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.sass'],
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
export class BackgroundComponent {

}
