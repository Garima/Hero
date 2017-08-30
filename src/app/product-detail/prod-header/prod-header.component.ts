import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prod-header',
  templateUrl: './prod-header.component.html',
  styleUrls: ['./prod-header.component.scss']
})
export class ProdHeaderComponent implements OnInit {
@Input() productData = null;
@Input() breadcrumb = null;
  constructor() { }

  ngOnInit() {
  }

}
