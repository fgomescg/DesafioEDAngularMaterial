import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '@app/_services/repository.service';
import { ErrorHandlerService } from '@app/_services/error-handler.service';
import { Book } from '@app/_interface/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public book: Book;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `/books/${id}`;
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.book = res as Book;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public redirectToBookList(){
    this.router.navigate(['/book/list']);
  }

}