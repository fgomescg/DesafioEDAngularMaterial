import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from '../author-list/author-list.component';
import { AuthorCreateComponent } from '@app/author/author-create/author-create.component';
import { AuthorUpdateComponent } from '@app/author/author-update/author-update.component';
import { AuthorDeleteComponent } from '@app/author/author-delete/author-delete.component';

const routes: Routes = [
  { path: 'authors', component: AuthorListComponent },
  { path: 'create', component: AuthorCreateComponent },
  { path: 'update/:id', component: AuthorUpdateComponent },
  { path: 'delete/:id', component: AuthorDeleteComponent }
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
export class AuthorRoutingModule { }
