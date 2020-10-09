import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '@app/_services/repository.service';
import { ErrorHandlerService } from '@app/_services/error-handler.service';
import { Book } from '@app/_interface/book.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css'],
})
export class BookDeleteComponent implements OnInit {
  public book: Book;
  public errorMessage: string = '';
  private dialogConfig;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
        successMessage: 'Livro deletado com sucesso !',
      },
    };
    this.getBookById();
  }

  getBookById = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    this.repository.getData(`/books/${id}`).subscribe(
      (res) => {
        this.book = res as Book;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public deleteBook = () => {
    this.repository.delete(`/books/${this.book.id}`).subscribe(
      () => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );
        dialogRef.afterClosed().subscribe(() => {
          this.location.back();
        });
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public onCancel() {
    this.location.back();
  }
}
