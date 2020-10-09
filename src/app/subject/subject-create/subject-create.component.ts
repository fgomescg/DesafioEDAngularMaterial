import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '@app/_services/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SubjectForCreation } from '@app/_interface/Subject-for-creation.model';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '@app/_services/error-handler.service';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {
  public subjectForm: FormGroup;
  public Subjects;
  private dialogConfig;


  constructor(private location: Location, private repository: RepositoryService ,private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.subjectForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
        successMessage: 'Assunto cadastrado com sucesso !',
      },
    };
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.subjectForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createSubject = (SubjectFormValue) => {
    if (this.subjectForm.valid) {
      this.executeSubjectCreation(SubjectFormValue);
    }
  }

  private executeSubjectCreation = (SubjectFormValue) => {
    const Subject: SubjectForCreation = {
      description: SubjectFormValue.description
    }
    this.repository.create('/subjects', Subject)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterClosed()
        .subscribe(() => {
          this.location.back();
        });
      },
      (error => {
        this.errorService.handleError(error);
      })
    )
  }
}
