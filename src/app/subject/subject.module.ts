import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';
import { SubjectDeleteComponent } from './subject-delete/subject-delete.component';
import { SubjectRoutingModule } from './subject-routing/subject-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module'

@NgModule({
  declarations: [SubjectListComponent, SubjectCreateComponent, SubjectUpdateComponent, SubjectDeleteComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SubjectModule { }
