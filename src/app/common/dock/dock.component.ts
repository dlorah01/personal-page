import { Component } from '@angular/core';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.sass']
})
export class DockComponent {
  dockItems: any[] = []

  constructor() {
    this.dockItems = [
      {
        name: "Whatsapp",
        link: "whatsapp://send?phone=573202794866",
        type: "whatsapp"
      },
      {
        name: "Github",
        link: "https://github.com/dlorah01",
        type: "github"
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/harold-garcia-0a83153b/",
        type: "linkedin"
      },
      {
        name: "Behance",
        link: "https://www.behance.net/dlorah01",
        type: "behance"
      }
    ]
  }

  getImageSrc(type: string): string {
    return `../../../../assets/icons/icon-${type}.svg`;
  }

  routeToLink(url: string): void {
    window.open(url, "_blank");
  }
}
