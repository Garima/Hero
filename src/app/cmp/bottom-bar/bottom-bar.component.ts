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
        window.open("http://hmcworld.co.in", "_blank");
        //window.location.href='http://www.hmc.com';
    }
}
