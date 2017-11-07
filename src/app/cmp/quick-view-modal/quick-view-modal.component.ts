import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quick-view-modal',
  templateUrl: './quick-view-modal.component.html',
  styleUrls: ['./quick-view-modal.component.scss']
})
export class QuickViewModalComponent implements OnInit {
@Input() productId;
    @Input() quickViewModal;
    @Input() quickViewData;
    errorMessage;
    urlBlurb= "";
  constructor() { }

  ngOnInit() {
    //  this.urlBlurb = this.quickViewData.name.replace(/\s/g,'-');
  }
    getUrlBlurb(){
        return this.quickViewData.name.replace(/[^a-zA-Z0-9]+/g,'-');
    }

}
