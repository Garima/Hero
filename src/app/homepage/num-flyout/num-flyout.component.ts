import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-num-flyout',
  templateUrl: './num-flyout.component.html',
  styleUrls: ['./num-flyout.component.scss']
})
export class NumFlyoutComponent implements OnInit {
    numberShown:boolean=false;

  constructor() { }

  ngOnInit() {
  }
    toggleNumber(){
        this.numberShown = !this.numberShown;
    }
    gotoHMC() : void {
        window.open("http://codices.co.in/hmc/#", "_blank");
        //window.location.href='http://www.hmc.com';
    }
}
