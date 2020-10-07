import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookRoutingModule } from './book-routing/book-routing.module';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookUpdateComponent, BookDeleteComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class BookModule { }
