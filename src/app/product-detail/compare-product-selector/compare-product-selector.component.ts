import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { SelectComponent, SelectItem } from 'ng2-select';
import {SelectModule} from 'ng2-select';
import { SessionIdService } from '../../service/session-id.service';

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
    @Input() productId;
    addedProds=[];
    productList=null;
    productCompareList=null;
    productCompareData = null;
    sessionid ='';
    //loading1:boolean = false;
    //loading2:boolean = false;
    //loading0:boolean = false;
  constructor(private http: Http,
              private sessionIdService: SessionIdService) {}

  ngOnInit() {
      this.getProducts();
      this.getCompareList();
  }
    ngOnChanges(changes) {
        this.getCompareList();
    }
    toggleCompare(){
        this.compareOpen = !this.compareOpen;
    }
    showComparison() {
        //if only one prod then show select more
        //if more then one - send api call populate data open pop up
        if(this.productCompareList && this.productCompareList.length > 1){
            this.productCompareData = this.productCompareList;
            this.compareModal.show();
        }
}
    addToCompare(productID){
        //this["loading"+slotId] =  true;
        this.http.get(this.addCompareUrl+'?productid='+productID + '&sessionid=' + this.sessionIdService.get())
            .toPromise()
            .then(response => {
                this.sessionIdService.set(response.json().sessionid);
                this.getCompareList();
            }
        ).catch(error => console.error('An error occurred', error));
    }
    removeFromCompare(productID){
        this.http.get(environment.apiHost+'/api/web/product/compare/remove'+'?productid='+
                        productID + '&sessionid=' + this.sessionIdService.get())
            .toPromise()
            .then(response => {
                this.getCompareList();
                //this["loading1"] =  false;
                //this["loading2"] =  false;
                //this["loading0"] =  false;
            }
        ).catch(error => console.error('An error occurred', error));
    }
    getCompareList(){

        this.http.get(environment.apiHost+'/api/web/product/compare' + '?sessionid=' + this.sessionIdService.get())
            .toPromise()
            .then(response => {
                this.productCompareList = response.json().data;
            }
        ).catch(error => console.error('An error occurred', error));
    }
    getProducts(){
        this.http.get(environment.apiHost+'/api/web/product/search')
            .toPromise()
            .then(response =>{

                this.productList = response.json().products;
                this.productList.sort((a, b) => {
                    if ( a.name < b.name)
                        return -1;
                    if ( a.name > b.name )
                        return 1;
                    return 0;
                });
                for(let product of this.productList){
                    product.text = product.name;
                }
            }
        ).catch(error => console.error('An error occurred', error));
    }
}
