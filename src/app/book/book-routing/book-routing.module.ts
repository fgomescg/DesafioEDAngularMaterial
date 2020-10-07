import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';
import { BookDetailsComponent } from '@app/book/book-details/book-details.component';
import { BookCreateComponent } from '@app/book/book-create/book-create.component';

const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'details/:id', component: BookDetailsComponent},
  { path: 'create', component: BookCreateComponent }
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
