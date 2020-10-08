import { RepositoryService } from './../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthorList } from '../../_interface/author-list';
import { Author } from '../../_interface/author.model';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '@app/_services/error-handler.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, AfterViewInit {

  errorMessage: string = '';
  length : number;
  totalPages: number;
  currentPage: number = 0;
  pageSize : number = 10;
  dialogConfig;

  public displayedColumns = ['name', 'update', 'delete' ];
  public dataSource = new MatTableDataSource<Author>();

   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router, private dialog: MatDialog) { }
    ngOnInit() {
      this.getAuthors();
        this.dialogConfig = {
        height: '200px',
        width: '400px',
        disableClose: true,
        data: { }
      }
    }

    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
    }

    public getAuthors = () => {
      let params = new HttpParams().set("pageNumber",this.currentPage.toString()).set("pageSize", this.pageSize.toString());
      this.repoService.getData('api/v1/authors', params)
      .subscribe(res => {
        const { authors, totalCount, currentPage  } = res as AuthorList;
        this.dataSource.data = authors;
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
      this.getAuthors();
    }

    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    public redirectToUpdate = (id: string) => {
      const updateUrl: string = `/author/update/${id}`;
      this.router.navigate([updateUrl]);
    }
    public redirectToDelete = (id: string) => {
      const deleteUrl: string = `/author/delete/${id}`;
      this.router.navigate([deleteUrl]);
    }

}
