import { Injectable } from '@angular/core';
import { SelectComponent } from '../select.component';

@Injectable()
export class SelectService {
  private select!: SelectComponent;

  public register(select: SelectComponent): void {
    this.select = select;
  }

  public getSelect(): SelectComponent {
    return this.select;
  }
}
