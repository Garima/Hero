import { Component, OnInit } from '@angular/core';
import { GetLocalTextData } from '../../service/get-local-text-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  constructor(private getLocalData: GetLocalTextData) { }
html;
    errorMessage;
  ngOnInit() {
      this.getLocalData.getFile('overview.html').subscribe((data) => {
              this.html = data;
          }, error => this.errorMessage = <any>error
      );
  }

}
