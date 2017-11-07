import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss'],
    animations: [fadeInAnimation]
})
export class InvestorsComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
