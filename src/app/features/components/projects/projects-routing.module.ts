import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectDetailGuard } from 'src/app/guards/project-detail.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: 'project/:id',
        component: ProjectDetailComponent,
        canActivate: [ProjectDetailGuard]
      },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
