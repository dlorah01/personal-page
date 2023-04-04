import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit, OnDestroy{
  currentTime!: Date
  timeSubscription!: Subscription

  constructor() {
    this.currentTime = new Date()
  }

  ngOnInit(): void {
    this.timeSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date()
    })
  }
  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe()
  }

}
