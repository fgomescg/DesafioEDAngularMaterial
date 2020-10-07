import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '@app/_services/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BookForCreation } from '@app/_interface/book-for-creation.model';
import { AuthorList } from '@app/_interface/author-list';
import { SubjectList } from '@app/_interface/subject-list';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '@app/_services/error-handler.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  public bookForm: FormGroup;
  public authors;
  public subjects;
  public bookValue = 0;
  public currentYear = new Date().getFullYear();
  private dialogConfig;


  constructor(private location: Location, private repository: RepositoryService ,private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      company: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      edition: new FormControl('', [Validators.required]),
      value: new FormControl(this.bookValue, [Validators.required]),
      publishYear: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.min(1500), Validators.max(this.currentYear)]),
      bookAuthors: new FormControl(null),
      bookSubjects: new FormControl(null)
    });
    this.getAllAuthors();
    this.getAllSubjects();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public getAllAuthors = () => {
    this.repository.getData('/authors').subscribe(
      (res) => {
        const { authors } = res as AuthorList;
        this.authors = authors;
      },
      (error) => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      }
    );
  };

  public getAllSubjects = () => {
    this.repository.getData('/subjects').subscribe(
      (res) => {
        const { subjects } = res as SubjectList;
        this.subjects = subjects;
      },
      (error) => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
      }
    );
  };

  public hasError = (controlName: string, errorName: string) =>{
    return this.bookForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createBook = (bookFormValue) => {
    if (this.bookForm.valid) {
      this.executeBookCreation(bookFormValue);
    }
  }

  private executeBookCreation = (bookFormValue) => {
    const book: BookForCreation = {
      title: bookFormValue.title,
      company: bookFormValue.company,
      edition: Number(bookFormValue.edition),
      value:  Number(this.bookValue),
      publishYear: bookFormValue.publishYear,
      bookAuthors:  this.transformToBookAuthorModel(bookFormValue.bookAuthors),
      bookSubjects: this.transformToBookSubjectModel(bookFormValue.bookSubjects)
    }

    this.repository.create(`/books`, book)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });
      },
      (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
      })
    )
  }

  updateBRLAmount(event){
    this.bookValue = event.target.value;
  }

  private transformToBookAuthorModel(ids) {
    if (ids) {
      return ids.map((id) => {
        return { "authorId": id }
      });
    }
    return [];
  }

  private transformToBookSubjectModel(ids) {
    if (ids) {
      return ids.map((id) => {
        return { "subjectId": id }
      });
    }
    return [];
  }
}
