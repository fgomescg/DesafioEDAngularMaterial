import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '@app/_services/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SubjectForCreation } from '@app/_interface/subject-for-creation.model';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '@app/_services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '@app/_interface/subject.model';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css'],
})
export class SubjectUpdateComponent implements OnInit {
  public subjectForm: FormGroup;
  public subject;
  private dialogConfig;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subjectForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
    this.getSubjectById();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
        successMessage: 'Assunto atualizado com sucesso !',
      },
    };
  }

  private getSubjectById = () => {
    let subjectId: string = this.activeRoute.snapshot.params['id'];

    this.repository.getData(`/subjects/${subjectId}`).subscribe(
      (res) => {
        this.subject = res as Subject;
        this.subjectForm.patchValue(this.subject);
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.subjectForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public updateSubject = (subjectFormValue) => {
    if (this.subjectForm.valid) {
      this.executeSubjectUpdate(subjectFormValue);
    }
  };

  private executeSubjectUpdate = (subjectFormValue) => {
    const subject: SubjectForCreation = {
      description: subjectFormValue.description,
    };
    let subjectId: string = this.activeRoute.snapshot.params['id'];
    this.repository.update(`/subjects/${subjectId}`, subject).subscribe(
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
