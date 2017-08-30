import { Component, OnInit, Input } from '@angular/core';
import { GetLocalJsonData } from '../../service/get-local-JSON-data.service';

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
  constructor(private getLocalData: GetLocalJsonData) { }

  ngOnInit() {
 /*     this.getLocalData.getFile('quick-view-dummy.json').subscribe((data) => {
              this.quickViewData = data;
          }, error => this.errorMessage = <any>error
      );*/
      //this.quickViewData = this.productId;
  }

}
