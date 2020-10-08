import { Component, OnInit } from '@angular/core';
import { EnvironmentUrlService } from '@app/_services/environment-url.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private envUrl: EnvironmentUrlService) { }

  ngOnInit(): void {
  }

  openReport(download : boolean) {
    if(download) {
      window.open(`${this.envUrl.urlAddress}/api/v1/report/download`);
      }
      window.open(`${this.envUrl.urlAddress}/api/v1/report`);
  }
}
