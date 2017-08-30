import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prod-specification',
  templateUrl: './prod-specification.component.html',
  styleUrls: ['./prod-specification.component.scss']
})
export class ProdSpecificationComponent implements OnInit {
@Input() specifications = null;

  constructor() { }

  ngOnInit() {
  }

}
