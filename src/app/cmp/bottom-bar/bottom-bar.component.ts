import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    gotoHMC() : void {
        window.open("http://codices.co.in/hmc/#", "_blank");
        //window.location.href='http://www.hmc.com';
    }
}
