import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeSubject = new BehaviorSubject('theme-1')

  constructor() { }

  setItem(theme: string): void {
    this.themeSubject.next(theme)
  }
}
