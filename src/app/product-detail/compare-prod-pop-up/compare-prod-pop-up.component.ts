import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compare-prod-pop-up',
  templateUrl: './compare-prod-pop-up.component.html',
  styleUrls: ['./compare-prod-pop-up.component.scss']
})
export class CompareProdPopUpComponent implements OnInit {
@Input() productCompareData = null;
    numOfProd = 0;
    prod3=false;
  constructor() { }

  ngOnInit() {
  }
    ngOnChanges(){
        if(this.productCompareData)
            this.numOfProd = this.productCompareData.length;
    }

}
