import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
    animations: [fadeInAnimation]
})
export class DisclaimerComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
