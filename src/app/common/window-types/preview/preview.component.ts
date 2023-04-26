import { AfterViewInit, Component, Input } from '@angular/core';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements AfterViewInit{
  @Input() project!: any
  imgSource!: string

  constructor() {}

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
}
