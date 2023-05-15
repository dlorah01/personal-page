import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.sass'],
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
export class EmailComponent {
  title !: string
  content!: any[]

  constructor(private router: Router, private route: ActivatedRoute) {
    this.title = 'sections.contact.title'
    this.content = [
    ]
  }
}
