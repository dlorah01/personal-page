import { Component, Input } from '@angular/core';
import { Font } from './models/font';
import { Size } from './models/size';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.sass']
})

export class WordComponent {
  @Input() title!: string
  @Input() content!: any[]

  fonts !: Font[]
  defaultFont!: Font

  sizes!: Size[]
  defaultSize!: Size

  textAlignment = "left"

  characters: number [] = [599, 268]
  words: number[] = [90, 39]
  pages: number = 2
  currentPage: number = 1

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

  changeFontSize(fontSize: any): void {
    this.defaultSize = this.sizes.find((x) => x.size === fontSize.selected.value) || this.sizes[2]
  }

  changeFontType(fontType: any): void {
    this.defaultFont = this.fonts.find((x) => x.name === fontType.selected.value) || this.fonts[0]
  }

  changeAlignment(alignment: string): void {
    this.textAlignment = alignment
  }

  onNameChange(val: any, index: number) {
    this.characters[index] = val.textContent.length
    this.words[index] = val.textContent.split(' ').length
  }


  onIntersection(event: any): void {
    if (event[0].target.id === 'page-0' && event[0].isIntersecting === true) {
      this.currentPage = 1
    }
    else {
      this.currentPage = 2
    }
  }
}
