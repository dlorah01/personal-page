import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { DockComponent } from './dock/dock.component';
import { WindowComponent } from './window/window.component';
import { MenuComponent } from './menu/menu.component';
import { DesktopItemComponent } from './desktop-item/desktop-item.component';
import { WordComponent } from './window-types/word/word.component';
import { OutlookComponent } from './window-types/outlook/outlook.component';
import { FolderComponent } from './window-types/folder/folder.component';



@NgModule({
  declarations: [
    TopbarComponent,
    DockComponent,
    WindowComponent,
    MenuComponent,
    DesktopItemComponent,
    WordComponent,
    OutlookComponent,
    FolderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopbarComponent,
    DockComponent,
    DesktopItemComponent,
    WindowComponent,
    WordComponent

  ]
})
export class CommonComponentsModule { }
