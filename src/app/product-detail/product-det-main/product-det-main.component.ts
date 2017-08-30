import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/toPromise';
import { BreadcrumbService} from '../../service/breadcrumb.service';

@Component({
  selector: 'app-product-det-main',
  templateUrl: './product-det-main.component.html',
  styleUrls: ['./product-det-main.component.scss']
})
export class ProductDetMainComponent implements OnInit {
    private prodViewUrl = environment.apiHost + '/api/web/product/viewproduct';
    productData;
    productId;
    errorMessage;
    breadcrumb;
  constructor(private http: Http,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              private location: Location,
              private router: Router) { this.productId = route.snapshot.params['id'];}

  ngOnInit() {
      this.getProduct();
  }
    getProduct(): void {
        this.http.get(this.prodViewUrl+'/'+this.productId)
            .toPromise()
            .then(response =>{
                this.productData = response.json();
                this.breadcrumb = this.breadcrumbService.getBreadcrumbs();
            }
        ).catch(error => console.error('An error occurred', error));

    }

}
