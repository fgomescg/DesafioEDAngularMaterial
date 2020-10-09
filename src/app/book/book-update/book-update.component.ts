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
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@app/_interface/book.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  bookForm: FormGroup;
  book: Book;
  authors;
  subjects;
  bookValue = 0;
  defaultPageSize = "30";
  currentYear = new Date().getFullYear();
  private dialogConfig;
  defaultParams = new HttpParams().set("pageNumber", "0")
                .set("pageSize", this.defaultPageSize);


  constructor(private location: Location, private repository: RepositoryService ,private dialog: MatDialog, private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getBookById();

    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      company: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      edition: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
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
      data: {
        successMessage: 'Livro atualizado com sucesso !',
      }
    }
  }

  private getBookById = () => {
    let bookId: string = this.activeRoute.snapshot.params['id'];

    this.repository.getData(`/books/${bookId}`)
      .subscribe(res => {
        this.book = res as Book;
        this.bookForm.patchValue(this.book);

        var selectedAuthors = this.book.authors.map((obj) => {
          return obj["authorId"];
        });
        this.bookForm.controls.bookAuthors.setValue(selectedAuthors);

        var selectedSubjects = this.book.subjects.map((obj) => {
          return obj["subjectId"];
        })
        this.bookForm.controls.bookSubjects.setValue(selectedSubjects);
      },
      (error) => {
        this.errorService.handleError(error);
      })
  }

  public getAllAuthors = () => {
    this.repository.getData('/authors', this.defaultParams).subscribe(
      (res) => {
        const { authors } = res as AuthorList;
        this.authors = authors;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  };

  public getAllSubjects = () => {
    this.repository.getData('/subjects', this.defaultParams).subscribe(
      (res) => {
        const { subjects } = res as SubjectList;
        this.subjects = subjects;
      },
      (error) => {
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

  public updateBook = (bookFormValue) => {
    if (this.bookForm.valid) {
      this.executeBookUpdate(bookFormValue);
    }
  }

  private executeBookUpdate = (bookFormValue) => {
    const book: BookForCreation = {
      title: bookFormValue.title,
      company: bookFormValue.company,
      edition: bookFormValue.edition,
      value:  bookFormValue.value,
      publishYear: bookFormValue.publishYear,
      BookAuthors:  this.transformToBookAuthorModel(bookFormValue.bookAuthors),
      BookSubjects: this.transformToBookSubjectModel(bookFormValue.bookSubjects)
    }

    this.repository.update(`/books/${this.book.id}`, book)
      .subscribe(() => {
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

  updateBRLAmount(event){
    this.bookValue = event.target.value;
  }

  private transformToBookAuthorModel(ids) {
    if (ids) {
      return ids.map((id) => {
        return { "AuthorId": id, "BookId": this.book.id }
      });
    }
    return [];
  }

  private transformToBookSubjectModel(ids) {
    if (ids) {
      return ids.map((id) => {
        return { "SubjectId": id, "BookId": this.book.id }
      });
    }
    return [];
  }
}
