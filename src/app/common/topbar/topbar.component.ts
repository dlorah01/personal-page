import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit, OnDestroy{
  currentTime!: Date
  timeSubscription!: Subscription
  label = "name"
  @Output() emitValue = new EventEmitter<string>();
  @Output() emitLanguageValue = new EventEmitter<string>();

  options = [
    {name:'Theme 1',value: 'theme-1'},
    {name:'Theme 2',value: 'theme-2'},
    {name:'Theme 3',value: 'theme-3'},
    {name:'Theme 4',value: 'theme-4'},
    {name:'Theme 5',value: 'theme-5'},
    {name:'Theme 6',value: 'theme-6'},
    {name:'Theme 7',value: 'theme-7'},
  ];

  languages = [
    {name:'English',code: 'en'},
    {name:'Español',code: 'es'},
  ];

  constructor() {
    this.currentTime = new Date()
  }

  ngOnInit(): void {
    this.timeSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date()
    })
  }

  update(selection: any): void {
    console.log('selection', selection.selected.value)
    this.emitValue.emit(selection.selected.value)
  }

  updateSelection(selection: string): void {
    console.log('selection', selection)
    this.emitValue.emit(selection)
  }

  updateLanguage(selection: any): void {
    this.emitLanguageValue.emit(selection.selected.value)
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe()
  }

}
