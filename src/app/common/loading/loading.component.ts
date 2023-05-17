import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
  animations: [
    trigger('loadingAnimation', [
      state('start', style({
        width: '0%'
      })),
      state('end', style({
        width: '100%'
      })),
      transition('start => end', [
        animate('3s')
      ])
    ])
  ]
})
export class LoadingComponent implements OnInit {
  state: string = 'start';
  @Output() finishEmit = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
   setTimeout(() => {
    this.state = 'end';
    setTimeout(() => {
      this.finishEmit.emit(true)
    }, 4000);
   })
  }

}
