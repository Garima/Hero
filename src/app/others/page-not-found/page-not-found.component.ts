import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
    animations: [fadeInAnimation]
})
export class PageNotFoundComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
