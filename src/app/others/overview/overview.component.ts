import { Component, OnInit,HostBinding } from '@angular/core';
import { GetLocalTextData } from '../../service/get-local-text-data.service';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
    animations: [fadeInAnimation]
})
export class OverviewComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
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
