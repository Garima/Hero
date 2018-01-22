import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

import { dataFadeInAnimation } from '../../animations';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
    animations:[dataFadeInAnimation]
})
export class CommunityComponent implements OnInit {
    socialFeeds;
    errorMessage;
    maxNumberFeed = 0;
    pagesToDisplay = 1;
    private facebookUrl = environment.apiHost + '/api/web/facebookfeed';
    private twitterUrl = environment.apiHost + '/api/web/twitterfeed';
    private instagramUrl = environment.apiHost + '/api/web/instagramfeed';
    fbData;
    twitterData;
    instagramData;
  constructor(private http: Http) { }

  ngOnInit() {

      this.http.get(this.facebookUrl)
          .toPromise()
          .then(response => {
              this.fbData = response.json();
              this.maxNumberFeed = this.maxNumberFeed > this.fbData.data.length ?
                  this.maxNumberFeed : this.fbData.data.length;
          }
      ).catch(error => console.error('An error occurred', error));
      this.http.get(this.twitterUrl)
          .toPromise()
          .then(response => {
              this.twitterData = response.json()
          }
      ).catch(error => console.error('An error occurred', error));

      this.http.get(this.instagramUrl)
          .toPromise()
          .then(response => {
              let responseData = response.json();
              this.instagramData = responseData.data;/*.filter(item =>
                item.type === "image"
              );*/
          }
      ).catch(error => console.error('An error occurred', error));
  }

    showMorePosts(){
        if(this.pagesToDisplay < this.maxNumberFeed){
            this.pagesToDisplay ++;
        }
    }
}
