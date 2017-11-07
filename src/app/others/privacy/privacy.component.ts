import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
    animations: [fadeInAnimation]
})
export class PrivacyComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'relative';
  constructor() { }

  ngOnInit() {
  }

}
