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
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { SelectSimplifiedComponent } from './select-simplified/select-simplified.component';
import { SelectOptionComponent } from './select/components/select-option/select-option.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y'
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../pipes/pipes.module';
import { VisibilityDirective } from '../directives/visibility.directive';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { PreviewComponent } from './window-types/preview/preview.component';
import { BackgroundComponent } from './background/background.component';
import { LoadingComponent } from './loading/loading.component';


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
    SelectComponent,
    SelectSimplifiedComponent,
    SelectOptionComponent,
    VisibilityDirective,
    PreviewComponent,
    BackgroundComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    A11yModule,
    TranslateModule,
    PipesModule,
    IntersectionObserverModule
  ],
  exports: [
    TopbarComponent,
    DockComponent,
    DesktopItemComponent,
    WindowComponent,
    WordComponent,
    FolderComponent,
    PreviewComponent,
    SelectSimplifiedComponent,
    SelectComponent,
    SelectOptionComponent,
    BackgroundComponent,
    OutlookComponent,
    LoadingComponent
  ]
})
export class CommonComponentsModule { }
