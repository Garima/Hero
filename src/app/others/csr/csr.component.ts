import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csr',
  templateUrl: './csr.component.html',
  styleUrls: ['./csr.component.scss']
})
export class CsrComponent implements OnInit {
tabOpen = 1;
  constructor() { }

  ngOnInit() {
  }
    openTab(tabSelected){
        this.tabOpen = tabSelected;

    }
}
