import { Component, Input } from '@angular/core';
import { Font } from './models/font';
import { NgModel } from '@angular/forms';
import { Size } from './models/size';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.sass']
})
export class WordComponent {

  @Input() title!: string
  @Input() content!: string[]

  fonts !: Font[]
  defaultFont!: Font

  sizes!: Size[]
  defaultSize!: Size

  constructor() {
    this.fonts = [
      {
        name: 'Courier Prime',
        style: 'courier'
      },
      {
        name: 'Montserrat',
        style: 'montserrat'
      },
      {
        name: 'Indie Flower',
        style: 'indie'
      },
      {
        name: 'Roboto',
        style: 'roboto'
      }
    ]
    this.defaultFont = this.fonts[0]

    this.sizes = [
      {
        name: 'small',
        size: '8'
      },
      {
        name: 'semi-small',
        size: '12'
      },
      {
        name: 'medium',
        size: '16'
      },
      {
        name: 'semi-big',
        size: '20'
      },
      {
        name: 'big',
        size: '24'
      }
    ]
    this.defaultSize = this.sizes[2]
  }

  changeFontSize(fontSize: HTMLSelectElement): void {
    this.defaultSize = this.sizes.find((x) => x.size === fontSize.value) || this.sizes[2]
  }
  changeFontType(fontType: HTMLSelectElement): void {
    this.defaultFont = this.fonts.find((x) => x.name === fontType.value) || this.fonts[0]
  }
}
