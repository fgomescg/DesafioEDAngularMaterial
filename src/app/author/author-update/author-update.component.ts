import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '@app/_services/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthorForCreation } from '@app/_interface/author-for-creation.model';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '@app/_services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/_interface/author.model';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.css'],
})
export class AuthorUpdateComponent implements OnInit {
  public authorForm: FormGroup;
  public author;
  private dialogConfig;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authorForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
    });
    this.getAuthorById();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
        successMessage: 'Autor atualizado com sucesso !',
      },
    };
  }

  private getAuthorById = () => {
    let authorId: string = this.activeRoute.snapshot.params['id'];

    this.repository.getData(`/authors/${authorId}`).subscribe(
      (res) => {
        this.author = res as Author;
        this.authorForm.patchValue(this.author);
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.authorForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public updateAuthor = (AuthorFormValue) => {
    if (this.authorForm.valid) {
      this.executeAuthorUpdate(AuthorFormValue);
    }
  };

  private executeAuthorUpdate = (authorFormValue) => {
    const author: AuthorForCreation = {
      name: authorFormValue.name,
    };
    let authorId: string = this.activeRoute.snapshot.params['id'];
    this.repository.update(`/authors/${authorId}`, author).subscribe(
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
}
