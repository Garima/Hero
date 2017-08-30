import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location } from '@angular/common';

import { SiteNavigationService } from '../../service/site-navigation.service';
import { BreadcrumbService} from '../../service/breadcrumb.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-category-main',
  templateUrl: './category-main.component.html',
  styleUrls: ['./category-main.component.scss']
})
export class CategoryMainComponent implements OnInit {
    private plpURL = environment.apiHost + '/api/web/product/search';
    productList;
    subCategory;
    bannerImg=null;
    catDesc = null;
    routeParams = null;
    isloading=false;
    searchParams: URLSearchParams = new URLSearchParams();
  constructor(private http: Http,
              private siteNavigationService: SiteNavigationService,
              private breadcrumbService: BreadcrumbService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) { this.subCategory = route.snapshot.params['subCategory'];}

  ngOnInit() {
      this.getBrandProducts();
  }
    getBrandProducts(): void {
        let self = this;
        let menu,selectedBrand;
            this.routeParams = this.route.params
                .subscribe((params:Params) => {
                    self.breadcrumbService.setBreadcrumbs([
                        {'label': params['brand'], url: "/" + params['brand']},
                        {'label': params['category'], url: '/' + params['brand'] + '/' + params['category']},
                        {'label': params['subCategory'], url: '/' + params['brand'] + '/' + params['category'] + '/' + params['subCategory']}
                    ]);
                    self.siteNavigationService.getCategoryData(params['brand'], params['category'])
                        .then(category1 =>{

                    menu = category1;
                    if (menu.brands) {
                        selectedBrand = menu.brands.find((brand) => {
                            return brand.link === this.subCategory;
                        });

                    }
                    this.bannerImg = selectedBrand.bannerImgLrg;
                    this.catDesc = selectedBrand.catDesc;
                    this.searchParams.set('brand', selectedBrand.id);
                    this.getProducts(this.searchParams);
                        }
                    );

                }
            );
    }
    ngOnDestroy() {
        if(this.routeParams) {
            this.routeParams.unsubscribe();
        }
    }
    getProducts(params:URLSearchParams): void {
            this.http.get(this.plpURL,{search: params})
                .toPromise()
                .then(response =>{
                    this.productList = response.json();
                    this.isloading = false;
                }
            ).catch(error => console.error('An error occurred', error));


    }
    refreshData(criterion){

        this.isloading = true;
        //if option exist then delete
        let existingValue = this.searchParams.get(criterion.filter);//this can come out to be an array need to handle case
        if(existingValue){
            let existingValueAr = existingValue.toString().indexOf(',') > -1? existingValue.split(',') : [existingValue];
            if(existingValueAr.indexOf(criterion.option.toString()) > -1 ){
                existingValueAr.splice(existingValueAr.indexOf(criterion.option.toString()), 1);
                if(existingValueAr.length > 0){
                    this.searchParams.set(criterion.filter,existingValueAr.join(','));//ned option to delete just one value
                }else{
                    this.searchParams.delete(criterion.filter);
                }
            }else{
                //this.searchParams.append(criterion.filter[1], criterion.option);
                this.searchParams.set(criterion.filter, existingValue + ',' +criterion.option);
            }
        }else{
            this.searchParams.set(criterion.filter, criterion.option.toString());
        }
        this.getProducts(this.searchParams);
    }
    clearAll(){
        this.isloading = true;
        this.searchParams = new URLSearchParams();
        this.getProducts(null);
    }
    removeParam(param){
        this.isloading = true;
        this.searchParams = new URLSearchParams();
        this.getProducts(this.searchParams);
    }
}
