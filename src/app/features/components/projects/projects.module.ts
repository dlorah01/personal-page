import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { CommonComponentsModule } from 'src/app/common/common.module';


@NgModule({
  declarations: [
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    CommonComponentsModule
  ]
})
export class ProjectsModule { }
