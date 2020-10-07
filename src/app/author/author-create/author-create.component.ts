import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '@app/_services/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthorForCreation } from '@app/_interface/author-for-creation.model';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '@app/_services/error-handler.service';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {
  public authorForm: FormGroup;
  public authors;
  private dialogConfig;


  constructor(private location: Location, private repository: RepositoryService ,private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.authorForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.authorForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createAuthor = (AuthorFormValue) => {
    if (this.authorForm.valid) {
      this.executeAuthorCreation(AuthorFormValue);
    }
  }

  private executeAuthorCreation = (authorFormValue) => {
    const author: AuthorForCreation = {
      name: authorFormValue.name
    }
    const apiUrl = 'api/v1/authors';
    this.repository.create(apiUrl, author)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterClosed()
      },
      (error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      })
    )
  }
}
