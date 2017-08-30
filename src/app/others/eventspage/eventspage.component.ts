import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-eventspage',
  templateUrl: './eventspage.component.html',
  styleUrls: ['./eventspage.component.scss']
})
export class EventspageComponent implements OnInit {
    private eventsUrl = environment.apiHost + '/api/web/events/getall';
    events;

  constructor(private http: Http) { }

    ngOnInit() {
        this.getEvents();
    }
    getEvents(): void {
        this.http.get(this.eventsUrl)
            .toPromise()
            .then(response =>
                this.events = response.json()
        ).catch(error => console.error('An error occurred', error));

    }


}
