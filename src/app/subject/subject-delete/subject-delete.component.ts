import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '@app/_services/repository.service';
import { ErrorHandlerService } from '@app/_services/error-handler.service';
import { Subject } from '@app/_interface/Subject.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-subject-delete',
  templateUrl: './subject-delete.component.html',
  styleUrls: ['./subject-delete.component.css'],
})
export class SubjectDeleteComponent implements OnInit {
  public Subject: Subject;
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
    this.getSubjectById();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
        successMessage: 'Assunto deletado com sucesso !',
      },
    };
  }

  getSubjectById = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    this.repository.getData(`/subjects/${id}`).subscribe(
      (res) => {
        this.Subject = res as Subject;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public deleteSubject = () => {
    this.repository.delete(`/subjects/${this.Subject.subjectId}`).subscribe(
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
