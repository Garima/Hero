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
    bannerImgSm=null;
    defaultBannerImg = "./assets/images/banners/brand/hero.jpg";
    catDesc = null;
    queryParams = null;
    searchParams =[];//: URLSearchParams = new URLSearchParams('',new GhQueryEncoder());
    queryEncode = new GhQueryEncoder();
    isloading=false;
    sortOrder="asc";

@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

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

                    this.searchParams = [];//new URLSearchParams('',new GhQueryEncoder());
                    for (let param in params) {
                        this.searchParams[param] = params[param].toString();
                        if(param == "filter_dir"){
                            this.sortOrder = params[param].toString();
                        }
                    }
                    this.getProducts(this.searchParams);
                });
    }
    ngOnDestroy() {
        if(this.queryParams) {
            this.queryParams.unsubscribe();
        }
    }
    getProducts(params): void {

        let param = Object.keys(this.searchParams).map(k =>
            `${this.queryEncode.encodeKey(k)}=${this.queryEncode.encodeValue(this.searchParams[k])}`).join('&');
        this.http.get(this.plpURL + "?"+ param)
            .toPromise()
            .then(response => {
                this.productList = response.json();
                this.bannerImg = this.productList.bannerImgLg;// == '' ? this.defaultBannerImg :this.productList.bannerImgLg ;
                this.bannerImgSm = this.productList.bannerImgSm;
                this.isloading = false;
            }
        ).catch(error => console.error('An error occurred', error));

    }
    sortData(criterion){

        this.isloading = true;
        //if option exist then delete
        this.searchParams["filter_type"] =  criterion.filter;
        this.searchParams["filter_dir"] =  criterion.direction;
        this.router.navigate(['/search'], { queryParams: this.searchParams });
        //this.getProducts(this.searchParams);
    }
    refreshData(criterion){
        this.isloading = true;
        //if option exist then delete
        let existingValue = this.searchParams[criterion.filter];
        if(existingValue){
            let existingValueAr = existingValue.toString().indexOf(',') > -1? existingValue.split(',') : [existingValue];
            if(existingValueAr.indexOf(criterion.option.toString()) > -1 ){
                existingValueAr.splice(existingValueAr.indexOf(criterion.option.toString()), 1);
                if(existingValueAr.length > 0){
                    this.searchParams[criterion.filter] = existingValueAr.join(',');
                }else{
                    this.searchParams[criterion.filter] = null;
                }
            }else{
                this.searchParams[criterion.filter] =  existingValue + ',' +criterion.option;
            }
        }else{
            this.searchParams[criterion.filter] =  criterion.option.toString();
        }
        let self = this;

        this.router.navigate(['/search'], { queryParams: this.searchParams });
        //this.getProducts(this.searchParams);
    }
    clearAll(){
        this.isloading = true;
        this.searchParams = [];// new URLSearchParams('',new GhQueryEncoder());
        this.router.navigate(['/search']);
        //this.getProducts(this.searchParams);
    }
    getParamObject(){
        //let param={};
        // for(var pair of this.searchParams.paramsMap.entries()) {
        // param.`{pair[0]}` = pair[1];
        //console.log(pair[0]+ ', '+ pair[1]);
        //  }
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
