import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss'],
    animations: [fadeInAnimation]
})
export class MilestoneComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
