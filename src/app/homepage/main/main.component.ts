import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    topSelling = null;
    newLaunch = null;
    homepageData=null;
  constructor(private http: Http) { }

  ngOnInit() {
      this.getData();
  }
getData(){

    this.http.get(environment.apiHost+'/api/web/home/getdata')
        .toPromise()
        .then(response => {
            this.homepageData = response.json();
            if(this.homepageData.newlylaunched){
                this.newLaunch =  this.homepageData.newlylaunched;
            }
            if(this.homepageData.topViewed){
                this.topSelling =  this.homepageData.topViewed;
            }
        }
    ).catch(error => console.error('An error occurred', error));
   // http://hero.i22.in/api/web/home/getdata
}
}
