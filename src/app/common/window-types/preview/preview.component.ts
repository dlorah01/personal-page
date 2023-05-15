import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass'],
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
export class PreviewComponent implements AfterViewInit{
  @Input() project!: any
  imgSource!: string
  currentProportion = 'center'
  currentFramework!: string

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("hi", changes['project'])
    if (changes['project']) {
     setTimeout(() => {
      this.currentFramework = changes['project'].currentValue.framework

     });
    }
  }

  getImageSrc(): string {
    return `../../../../assets/images/projects/${this.project.id}.png`;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.imgSource = this.getImageSrc()
    });
  }

  routeToLink(url: string): void {
    window.open(url, "_blank");
  }

  isADetail(text: string): boolean {
    return text.startsWith('- ')
  }

  changeView(proportion: string): void {
    this.currentProportion = proportion
  }
}
