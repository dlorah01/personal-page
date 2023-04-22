import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonComponentsModule } from 'src/app/common/common.module';
import { AboutMeComponent } from '../components/about-me/about-me.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { EmailComponent } from '../components/email/email.component';
import { BackgroundComponent } from '../background/background.component';


@NgModule({
  declarations: [
    MainComponent,
    AboutMeComponent,
    ProjectsComponent,
    EmailComponent,
    BackgroundComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CommonComponentsModule
  ]
})
export class MainModule { }
