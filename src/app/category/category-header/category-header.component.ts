import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.scss']
})
export class CategoryHeaderComponent implements OnInit {
@Input() catDesc;
@Input() bannerImg;
@Input() bannerImgSm;
  constructor() { }

  ngOnInit() {
  }

}
