import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

import { noop } from 'rxjs';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { SelectService } from './services/select.service';
import { CdkPortal } from '@angular/cdk/portal';

export interface SelectEvent {
  source: SelectComponent;
  selected: any;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SelectComponent,
    },
    SelectService,
  ],
})

export class SelectComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit
{
  @Input('id') public inputId: string = '';
  @Input() public placeholder: string = '';

  @Output() readonly change = new EventEmitter<SelectEvent>();

  @ViewChild('select') public select!: ElementRef;
  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;

  @ContentChildren(SelectOptionComponent)
  public options!: QueryList<SelectOptionComponent>;
  public displayText!: SafeHtml;
  public displayX: boolean = false;
  private selectedOption: SelectOptionComponent | undefined;
  private showing: boolean = false;
  private showPlaceholder: boolean = true;
  private overlayRef!: OverlayRef;
  private keyManager!: ActiveDescendantKeyManager<SelectOptionComponent>;
  private lastKeyPressed: string = '';
  private keyPressIndex: number = 0;
  private rewriteValue: any = undefined;

  constructor(
    private domSanitizer: DomSanitizer,
    private overlay: Overlay,
    private selectService: SelectService
  ) {
    this.selectService.register(this);
  }

  public onChangeFn: any = (_: any) => noop();

  public onTouchedFn: any = () => noop();

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  public ngOnInit(): void {
    if (!this.displayText) {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.placeholder
      );
    }
  }

  public ngAfterContentInit(): void {
    console.log('options', this.options)
    console.log('rewrite value', this.rewriteValue)
    if (this.rewriteValue !== undefined) {
      this.writeValue(this.rewriteValue);
    }

    this.keyManager = new ActiveDescendantKeyManager(this.options || [])
      .withHorizontalOrientation('ltr')
      .withVerticalOrientation()
      .withWrap();
      console.log('aqui ', this.options.first)
  }

  ngAfterViewInit(): void {
    if (this.options && this.options.first) {
      setTimeout(() => {
        this.selectOption(this.options.first)
      });
    }
  }

  public writeValue(obj: any): void {
    // writeValue is called before the content is fully initialized
    // Store that value and try again after content init
    // See bug: https://github.com/angular/angular/issues/29218
    if (this.options === undefined) {
      this.rewriteValue = obj;
      return;
    }
    this.selectedOption = this.options.find((x) => x.value === obj);
    this.updateDisplayText();
    this.change.emit({
      source: this,
      selected: this.selectedOption,
    });
  }

  public onTouched(): void {
    this.onTouchedFn();
  }

  private onChange(): void {
    this.onChangeFn(this.selectedOption?.value);

    this.change.emit({
      source: this,
      selected: this.selectedOption,
    });
  }


  public selectOption(option: SelectOptionComponent) {
    this.hide();
    if (this.selectedOption !== option) {
      this.selectedOption = option;
      this.onChange();
      this.updateDisplayText();
    }
  }

  private updateDisplayText(): void {
    if (this.selectedOption !== undefined) {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.selectedOption.getOptionElement().innerHTML
      );
      this.showPlaceholder = false;
    } else {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.placeholder
      );
      this.showPlaceholder = true;
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    console.log('jjsjjs')
    if (this.showing) {
      this.handleVisibleDropdown(event);
    } else {
      this.handleHiddenDropdown(event);
    }
  }

  private handleVisibleDropdown(event: KeyboardEvent): void {
    console.log('dsadas', event)
    switch (event.key) {
      // Enter and space cause the currently-highlighted item to become the active item
      case 'Enter':
      case ' ':
        if (this.keyManager.activeItem) {
          this.selectOption(this.keyManager.activeItem);
        }
        break;
      case 'Escape':
        this.hide();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
        this.keyManager.onKeydown(event);
        this.keyManager.activeItem?.scrollIntoView();
        // This prevents the arrow keys from scrolling the page while the drop-down is focused
        event.preventDefault();
        break;
      case 'Tab':
        this.keyManager.onKeydown(event);
        this.keyManager.activeItem?.scrollIntoView();
        break;
      case 'PageUp':
      case 'PageDown':
        event.preventDefault();
        break;
      default:
        // For all keys besides the ones enumerated above we'll use a search function to
        // select the item that begins with the letters that the user is entering
        event.stopPropagation();
        const firstFound = this.getOptionStartingWith(event.key);
        if (firstFound) {
          firstFound.scrollIntoView();
          this.keyManager.setActiveItem(firstFound);
        }
    }
  }

  private handleHiddenDropdown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        this.showDropdown();
        if (this.selectedOption) {
          this.selectedOption.scrollIntoView();
        }
        break;
      default:
        event.stopPropagation();
        const firstFound = this.getOptionStartingWith(event.key);
        if (firstFound) {
          this.selectOption(firstFound);
        }
    }
  }

  // Iterates through the options that start with the given letter indicated by the key press
  private getOptionStartingWith(key: string): SelectOptionComponent {
    if (this.lastKeyPressed === key) {
      this.keyPressIndex++;
    } else {
      this.keyPressIndex = 0;
    }
    this.lastKeyPressed = key;
    let optionsStartingWithKey = this.options.filter((option) => {
      return (
        !option.disabled &&
        option
          .getOptionElement()
          .textContent.trim()
          .toLocaleLowerCase()
          .startsWith(key.toLocaleLowerCase())
      );
    });
    return optionsStartingWithKey[
      this.keyPressIndex % optionsStartingWithKey.length
    ];
  }

  keys(event: any) {
    console.log('ev', event)
  }

  public showDropdown(): void {
    console.log('click')
    setTimeout(() => {
      this.select.nativeElement.focus()
    });
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
    console.log('valor show', this.showing)
  }

  private hide(): void {
    if (this.overlayRef) this.overlayRef.detach();
    this.showing = false;
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }

    const refRectWidth =
      this.select.nativeElement.getBoundingClientRect().width;
    this.overlayRef.updateSize({ width: refRectWidth });
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.select.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
