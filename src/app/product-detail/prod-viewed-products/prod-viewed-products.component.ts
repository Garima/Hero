import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prod-viewed-products',
  templateUrl: './prod-viewed-products.component.html',
  styleUrls: ['./prod-viewed-products.component.scss']
})
export class ProdViewedProductsComponent implements OnInit {
@Input() viewedProds = null;
    viewedProdsDisplay = [];

  constructor() { }

  ngOnInit() {/*
      if(this.viewedProds){
          this.groupArrayBy(this.viewedProds,2);
      }*/
      this.Init();
  }
    Init(){
        let count = 0;
        let tempArray = [];
        for(let prod of this.viewedProds){
            prod.urlBlurb = prod.name.replace(/[^a-zA-Z0-9]+/g,'-');
        }
        for(let item of this.viewedProds){
            tempArray.push(item);
            count++;
            if(count%2 == 0){
                this.viewedProdsDisplay.push(tempArray);
                tempArray=[];
            }
        }
    }
    ngOnChanges(changes) {
        for (let propName in changes) {
            if(propName = "viewedProds"){
                this.Init();
            }
        }
    }
}
