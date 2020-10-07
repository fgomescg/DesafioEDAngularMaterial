import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectListComponent } from '../subject-list/subject-list.component';

const routes: Routes = [
  { path: 'subjects', component: SubjectListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class SubjectRoutingModule { }
