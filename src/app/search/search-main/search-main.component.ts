import { Component, OnInit,HostBinding } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, URLSearchParams,QueryEncoder } from '@angular/http';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../../animations';

import { SiteNavigationService } from '../../service/site-navigation.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
    animations: [fadeInAnimation]
})
export class SearchMainComponent implements OnInit {
    private plpURL = environment.apiHost + '/api/web/product/search';
    productList;
    bannerImg=null;
    defaultBannerImg = "./assets/images/banners/brand/hero.jpg";
    catDesc = null;
    queryParams = null;
    searchParams: URLSearchParams = new URLSearchParams('',new GhQueryEncoder());
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
    isloading=false;
    constructor(private http: Http,
                private siteNavigationService: SiteNavigationService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {}

    ngOnInit() {
        this.getBrandProducts();
    }
    getBrandProducts(): void {
        let self = this;
        let menu,selectedBrand;
        this.isloading = true;
            this.queryParams =
                this.route.queryParams
                .subscribe(params => {
                    //let queryString = Object.keys(params)
                        //.map(k =>
                        //    `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                       // .join('&');

                        this.searchParams = new URLSearchParams('',new GhQueryEncoder());
                        for (let param in params) {
                            this.searchParams.set(param, params[param].toString());
                        }
                    this.getProducts(this.searchParams);
                });
    }
    ngOnDestroy() {
        if(this.queryParams) {
            this.queryParams.unsubscribe();
        }
    }
    getProducts(params:URLSearchParams): void {
        this.http.get(this.plpURL,{search: params})
            .toPromise()
            .then(response => {
                this.productList = response.json();

                this.bannerImg = this.productList.bannerImgLg;// == '' ? this.defaultBannerImg :this.productList.bannerImgLg;
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
                this.searchParams.set(criterion.filter, existingValue + ',' +criterion.option);
            }
        }else{
            this.searchParams.set(criterion.filter, criterion.option.toString());
        }
        this.getProducts(this.searchParams);
    }
    clearAll(){
        this.isloading = true;
        this.searchParams = new URLSearchParams('',new GhQueryEncoder());
        this.getProducts(this.searchParams);
    }
    removeParam(param){
        this.isloading = true;
        this.searchParams = new URLSearchParams('',new GhQueryEncoder());
        this.getProducts(this.searchParams);
    }
}

class GhQueryEncoder extends QueryEncoder {
    encodeKey(k: string): string {
        k = super.encodeKey(k);
        return k.replace(/\+/gi, '%2B');
    }
    encodeValue(v: string): string {
        v = super.encodeKey(v);
        return v.replace(/\+/gi, '%2B');
    }
}
