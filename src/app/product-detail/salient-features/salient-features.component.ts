import { Component, OnInit, Input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-salient-features',
  templateUrl: './salient-features.component.html',
  styleUrls: ['./salient-features.component.scss']
})
export class SalientFeaturesComponent implements OnInit {
@Input() salientFeatures = null;
  constructor() { }

  ngOnInit() {

  }

}
