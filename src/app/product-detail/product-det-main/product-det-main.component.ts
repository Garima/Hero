import { Component, OnInit,HostBinding } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../../animations';
import { SessionIdService } from '../../service/session-id.service';

import 'rxjs/add/operator/toPromise';
import { BreadcrumbService} from '../../service/breadcrumb.service';

@Component({
  selector: 'app-product-det-main',
  templateUrl: './product-det-main.component.html',
  styleUrls: ['./product-det-main.component.scss'],
    animations: [fadeInAnimation]
})
export class ProductDetMainComponent implements OnInit {
    private prodViewUrl = environment.apiHost + '/api/web/product/viewproduct';
    productData=null;
    productId;
    errorMessage;
    breadcrumb;
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
    private addCompareUrl = environment.apiHost + '/api/web/product/compare/add';
  constructor(private http: Http,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              private location: Location,
              private router: Router,
              private sessionIdService: SessionIdService) { //this.productId = route.snapshot.params['id'];
  }

  ngOnInit() {
      this.getParams();
      //this.productData.subscribe(() => {
          //document.body.scrollTop = 0;
      //});
      //this.getProduct();
      //this.productId = this.route.snapshot.params['id'];
  }
    getProduct(productId): void {
        this.http.get(this.prodViewUrl+'/'+productId)
            .toPromise()
            .then(response =>{
                this.productData = response.json();
                this.getBreadcrumbs();
                this.breadcrumb = this.breadcrumbService.getBreadcrumbs();
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
            }
        ).catch(error => console.error('An error occurred', error));

    }

    getBreadcrumbs(){
        this.breadcrumbService.setBreadcrumbs([
            {'label': this.productData.category.name, url: "/" +  this.productData.category.link},
            {'label': this.productData.subcategory.name, url: '/' +  this.productData.category.link + '/' +
                this.productData.subcategory.link},
            {'label': this.productData.brand.name, url: '/' +  this.productData.category.link + '/' +
                this.productData.subcategory.link + '/' +  this.productData.brand.link}
        ]);
    }
    getParams(): void {
            let self = this;
        this.route.params.subscribe(params => {
                this.getProduct(params["id"]);
                //this.addToCompare(params["id"]);
            }
        );
    }
    addToCompare(productID){
        this.http.get(this.addCompareUrl+'?productid='+productID + '&sessionid=' + this.sessionIdService.get())
            .toPromise()
            .then(response => {
                this.sessionIdService.set(response.json().sessionid);
            }
        ).catch(error => console.error('An error occurred', error));
    }


}
