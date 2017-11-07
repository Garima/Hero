import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prod-similar-products',
  templateUrl: './prod-similar-products.component.html',
  styleUrls: ['./prod-similar-products.component.scss']
})
export class ProdSimilarProductsComponent implements OnInit {
@Input() similarProds = null;

  constructor() { }

  ngOnInit() {
      for(let prod of this.similarProds){
          prod.urlBlurb = prod.name.replace(/[^a-zA-Z0-9]+/g,'-');
      }
  }

}
