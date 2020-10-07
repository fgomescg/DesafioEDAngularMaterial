import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookRoutingModule } from './book-routing/book-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { SharedModule } from '@app/shared/shared.module'

@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookUpdateComponent, BookDeleteComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    MatCurrencyFormatModule,
    SharedModule
    ]
})
export class BookModule { }
