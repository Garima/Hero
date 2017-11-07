import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
    quickViewProductData=null;
    @Input() productList;
    products;

@ViewChild('quickViewModal') public quickViewModal:ModalDirective;
  constructor() { }

  ngOnInit() {
  }
    populateData(prodData){
        this.quickViewModal.show();
        this.quickViewProductData = prodData;
    }
}
