import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openReport(download : boolean) {
    if(download) {
      window.open('http://localhost:5000/api/v1/report/download');
      }
      window.open('http://localhost:5000/api/v1/report');
  }
}
