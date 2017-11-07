import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss']
})
export class CategoryProductComponent implements OnInit {
    @Input() quickViewModal;
    @Input() prodData;
    @Output() quickViewShow: EventEmitter<any> = new EventEmitter<any>();
    urlBlurb= "";
  constructor() { }

  ngOnInit() {
      //this.urlBlurb = this.prodData.name.replace(/\s|\(|\)/g,'-');
      this.urlBlurb = this.prodData.name.replace(/[^a-zA-Z0-9]+/g,'-');

  }
    public showQuickView(): void {
        this.quickViewModal.show();
        this.quickViewShow.emit(this.prodData);
    }
}
