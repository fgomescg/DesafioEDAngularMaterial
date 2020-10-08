import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectListComponent } from '@app/subject/subject-list/subject-list.component';
import { SubjectCreateComponent } from '@app/subject/subject-create/subject-create.component';
import { SubjectUpdateComponent } from '@app/subject/subject-update/subject-update.component';
import { SubjectDeleteComponent } from '@app/subject/subject-delete/subject-delete.component';

const routes: Routes = [
  { path: 'subjects', component: SubjectListComponent },
  { path: 'create', component: SubjectCreateComponent },
  { path: 'update/:id', component: SubjectUpdateComponent },
  { path: 'delete/:id', component: SubjectDeleteComponent }
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
