import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BookList } from '../../_interface/book-list';
import { Book } from '../../_interface/book.model';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryService } from '@app/_services/repository.service';
import { ErrorHandlerService } from '@app/_services/error-handler.service';


@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

    errorMessage: string = '';
    length: number;
    totalPages: number;
    currentPage: number = 0;
    pageSize: number = 10;
    dialogConfig;

    public displayedColumns = ['title', 'company', 'edition', 'publishYear', 'value', 'details', 'update', 'delete'];
    public dataSource = new MatTableDataSource<Book>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router, private dialog: MatDialog) { }
    ngOnInit() {
        this.getBooks();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    public getBooks = () => {
        let params = new HttpParams().set("pageNumber", this.currentPage.toString()).set("pageSize", this.pageSize.toString());
        this.repoService.getData('/books', params)
            .subscribe(res => {
                const { books, totalCount, currentPage } = res as BookList;
                this.dataSource.data = books;
                this.length = totalCount;
                this.currentPage = currentPage;
            }),
            (error => {
                this.errorService.dialogConfig = { ...this.dialogConfig };
                this.errorService.handleError(error);
            })
    }

    public pageChanged = (event) => {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getBooks();
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    public redirectToDetails = (id: string) => {
        const detailsUrl: string = `/book/details/${id}`;
        this.router.navigate([detailsUrl]);
    }
    public redirectToUpdate = (id: string) => {
        const updateUrl: string = `/book/update/${id}`;
        this.router.navigate([updateUrl]);
    }
    public redirectToDelete = (id: string) => {
        const deleteUrl: string = `/book/delete/${id}`;
        this.router.navigate([deleteUrl]);
    }

}
