import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-compare-product-selector',
  templateUrl: './compare-product-selector.component.html',
  styleUrls: ['./compare-product-selector.component.scss']
})
export class CompareProductSelectorComponent implements OnInit {

@ViewChild('compareModal') public compareModal:ModalDirective;
compareOpen:boolean=false;
    private addCompareUrl = environment.apiHost + '/api/web/product/compare/add';
    addedProds=[];
    productList=null;
    productCompareList=null;
    productCompareData = null;
    sessionid ='';
  constructor(private http: Http) { }

  ngOnInit() {
      this.getProducts();
  }
    toggleCompare(){
        this.compareOpen = !this.compareOpen;
    }
    showComparison() {
        //if only one prod then show select more
        //if more then one - send api call populate data open pop up
        if(this.productCompareList && this.productCompareList.length > 1){
            this.compareModal.show();
            this.productCompareData = this.productCompareList;
        }
}
    addToCompare(productID){
        this.http.get(this.addCompareUrl+'?productid='+productID + '&sessionid=' + this.sessionid)
            .toPromise()
            .then(response => {
                this.sessionid = response.json().sessionid;
                this.getCompareList();
            }
        ).catch(error => console.error('An error occurred', error));
    }
    removeFromCompare(productID){
        this.http.get(environment.apiHost+'/api/web/product/compare/remove'+'?productid='+
                        productID + '&sessionid=' + this.sessionid)
            .toPromise()
            .then(response => {
                this.getCompareList();
            }
        ).catch(error => console.error('An error occurred', error));
    }
    getCompareList(){

        this.http.get(environment.apiHost+'/api/web/product/compare' + '?sessionid=' + this.sessionid)
            .toPromise()
            .then(response => {
                this.productCompareList = response.json().data;
            }
        ).catch(error => console.error('An error occurred', error));
    }
    getProducts(){
        this.http.get(environment.apiHost+'/api/web/product/search')
            .toPromise()
            .then(response =>
                this.productList = response.json().products
        ).catch(error => console.error('An error occurred', error));
    }
}
