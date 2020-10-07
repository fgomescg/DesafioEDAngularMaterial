import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';
import { BookDetailsComponent } from '@app/book/book-details/book-details.component';
import { BookCreateComponent } from '@app/book/book-create/book-create.component';
import { BookUpdateComponent } from '@app/book/book-update/book-update.component';
import { BookDeleteComponent } from '@app/book/book-delete/book-delete.component';

const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'details/:id', component: BookDetailsComponent},
  { path: 'create', component: BookCreateComponent },
  { path: 'update/:id', component: BookUpdateComponent },
  { path: 'delete/:id', component: BookDeleteComponent }
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
export class BookRoutingModule { }
