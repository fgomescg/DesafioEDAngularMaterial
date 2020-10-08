import { RepositoryService } from './../../shared/repository.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SubjectList } from '../../_interface/subject-list';
import { Subject } from '../../_interface/subject.model';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '@app/_services/error-handler.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit, AfterViewInit {

  errorMessage: string = '';
  length : number;
  totalPages: number;
  currentPage: number = 0;
  pageSize : number = 10;
  dialogConfig;

  public displayedColumns = ['description', 'update', 'delete' ];
  public dataSource = new MatTableDataSource<Subject>();

   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
    ngOnInit() {
      this.getSubjects();
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

    public getSubjects = () => {
      let params = new HttpParams().set("pageNumber",this.currentPage.toString()).set("pageSize", this.pageSize.toString());
      this.repoService.getData('api/v1/subjects', params)
      .subscribe(res => {
        const { subjects, totalCount, currentPage  } = res as SubjectList;
        this.dataSource.data = subjects;
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
      this.getSubjects();
    }

    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    public redirectToUpdate = (id: string) => {
      const updateUrl: string = `/subject/update/${id}`;
      this.router.navigate([updateUrl]);
    }
    public redirectToDelete = (id: string) => {
      const deleteUrl: string = `/subject/delete/${id}`;
      this.router.navigate([deleteUrl]);
    }

}
