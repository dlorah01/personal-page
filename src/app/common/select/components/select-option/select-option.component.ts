import { Highlightable } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { SelectComponent } from '../../select.component';
import { SelectService } from '../../services/select.service';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.sass'],
  host: {
    role: 'listbox',
    '[attr.aria-label]': 'value',
  },
})
export class SelectOptionComponent implements Highlightable {
  @Input()
  public value!: any;

  @HostBinding('class.disabled')
  @Input()
  public disabled = false;

  @HostBinding('class.active')
  public active = false;

  private select: SelectComponent;

  @ViewChild('option')
  private option!: ElementRef;

  constructor(private dropdownService: SelectService) {
    this.select = this.dropdownService.getSelect();
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent): void {
    event.preventDefault();
    if (!this.disabled) {
      this.select.selectOption(this);
    }
  }

  public getOptionElement(): any {
    return this.option.nativeElement;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  public scrollIntoView(): void {
    this.option.nativeElement.scrollIntoView({ block: 'center' });
  }
}
