import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-prod-header',
  templateUrl: './prod-header.component.html',
  styleUrls: ['./prod-header.component.scss']
})
export class ProdHeaderComponent implements OnInit {
@Input() productData = null;
@Input() breadcrumb = null;
    buyFormSubmitted=false;

@ViewChild('buyOnlineModal') public buyOnlineModal:ModalDirective;
bgImgNum =0;
  constructor() { }

  ngOnInit() {
      if(this.productData)
      this.bgImgNum = this.productData.id % 3;
  }
    openForm(){
        this.buyFormSubmitted = false;
        this.buyOnlineModal.show();
    }

}
