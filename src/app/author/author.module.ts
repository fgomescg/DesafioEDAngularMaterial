import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';
import { AuthorDeleteComponent } from './author-delete/author-delete.component';
import { AuthorRoutingModule } from './author-routing/author-routing.module';
import { MaterialModule } from './../material/material.module';


@NgModule({
  declarations: [AuthorListComponent, AuthorCreateComponent, AuthorUpdateComponent, AuthorDeleteComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    MaterialModule
  ]
})
export class AuthorModule { }
