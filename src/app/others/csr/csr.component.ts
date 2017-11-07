import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-csr',
  templateUrl: './csr.component.html',
  styleUrls: ['./csr.component.scss'],
    animations: [fadeInAnimation]
})
export class CsrComponent implements OnInit {
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
tabOpen = 1;
  constructor() { }

  ngOnInit() {
  }
    openTab(tabSelected){
        this.tabOpen = tabSelected;

    }
}
