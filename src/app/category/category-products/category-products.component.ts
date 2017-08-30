import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
    quickViewProductData=null;
    @Input() productList;
    products;
  constructor() { }

  ngOnInit() {
  }
    populateData(prodID){
        this.quickViewProductData = prodID;
    }
}
