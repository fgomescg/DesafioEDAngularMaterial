import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '@app/_services/repository.service';
import { ErrorHandlerService } from '@app/_services/error-handler.service';
import { Author } from '@app/_interface/Author.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-author-delete',
  templateUrl: './author-delete.component.html',
  styleUrls: ['./author-delete.component.css'],
})
export class AuthorDeleteComponent implements OnInit {
  public Author: Author;
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
    this.getAuthorById();
    this.dialogConfig = {
      height: '250px',
      width: '450px',
      disableClose: true,
      data: {
        successMessage: 'Autor deletado com sucesso !',
      },
    };
  }

  getAuthorById = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    this.repository.getData(`/authors/${id}`).subscribe(
      (res) => {
        this.Author = res as Author;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public deleteAuthor = () => {
    this.repository.delete(`/authors/${this.Author.authorId}`).subscribe(
      (res) => {
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
