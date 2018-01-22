import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { MatchMediaService } from '../../service/match-media-service.service';
import {Search } from '../../model/search';
import { dataFadeInAnimation } from '../../animations';

import {NavMenuItem } from '../../model/nav-menu-item';
import { SiteNavigationService } from '../../service/site-navigation.service';

@Component({
  selector: 'app-cycle-of-choice',
  templateUrl: './cycle-of-choice.component.html',
  styleUrls: ['./cycle-of-choice.component.scss'],
    animations:[dataFadeInAnimation]
})
export class CycleOfChoiceComponent implements OnInit {
    filterURL = environment.apiHost + '/api/web/getfilters';
    cycleFilter;//:NavMenuItem[];
    filters = null;
    ageValue = null;
    IsMobile: Boolean = false;
    IsDesktop: Boolean = true;
    criterion: Search = new Search();
    pageShown = 1;
    errorFilter:string =  null;
    ageFilter = null;
    gearValue = "";
    givePad = false;
    priceFilter = [
        {id:1,price_min:1500,price_max:2000,displayText:'1500-2000'},
        {id:2,price_min:2000,price_max:2500,displayText:'2000-2500'},
        {id:3,price_min:2000,price_max:3500,displayText:'3000-3500'},
        {id:4,price_min:3500,price_max:4000,displayText:'3500-4000'},
        {id:5,price_min:4000,price_max:5000,displayText:'4000-5000'},
        {id:6,price_min:5000,price_max:6500,displayText:'5000-6500'},
        {id:7,price_min:6500,price_max:8000,displayText:'6500-8000'},
        {id:8,price_min:8000,price_max:11000,displayText:'8000-11000'},
        {id:9,price_min:15000,price_max:99999999,displayText:'15000+'}
    ];
  constructor(private matchMediaService: MatchMediaService,
              private siteNavigationService: SiteNavigationService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private http: Http) { }

  ngOnInit() {
      this.IsMobile = (this.matchMediaService.IsSmall());
      this.IsDesktop = (this.matchMediaService.IsLarge());
      this.pageShown =1;
      this.getFilter();
  }
    onResize(e){
        this.IsMobile = (this.matchMediaService.IsSmall());
        this.IsDesktop = (this.matchMediaService.IsLarge());
    }
    showNext(filtersToValidate){
        //show next page - 2 in mobile 1 in large
        //apply validation if one from each is selected
        if(this.validateFilter(filtersToValidate)){
            this.pageShown++;

        }
    }
    searchProduct(filtersToValidate){
        if(this.validateFilter(filtersToValidate)){
            //Object.keys(this.criterion).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(this.criterion[k])}`).join('&');
            this.router.navigate(['/search'], { queryParams: this.criterion });
        }


    }
    onSelectionChange(entry,type) {
        this.criterion[type] = entry;
        if(this.errorFilter === type){
            this.errorFilter = '';
        }
    }
    onTypeChange(entry,type){
        //get subnav fo it
        //and
        this.criterion[type] = entry;
      //  this.getCycleFilter(entry);
        if(this.errorFilter === type){
            this.errorFilter = '';
        }
    }
    validateFilter(filtersToValidate){
        for(var filter of filtersToValidate){
            if(this.criterion[filter] == null || this.criterion[filter] == -1){
                this.errorFilter = filter;
                return false;
            }
        }
        return true;
    }
    setPrice(priceId){
        let price = this.priceFilter.find((price) =>
            price.id == priceId
        );
        if(price){
            this.criterion['minPrice'] = price.price_min;
            this.criterion['maxPrice'] = price.price_max;
        }
        if(priceId == -1){
            this.criterion['minPrice'] = null;
            this.criterion['maxPrice'] = null;

        }
    }
    getCycleFilter(brand): void {
        this.siteNavigationService.getBrandData(brand).then(items => {
                this.cycleFilter = items.sub_categories
                if (this.cycleFilter.length / 3 > 1) {
                    this.givePad = true;
                }else{
                    this.givePad = false;
                }
            }
        );
    }
    getFilter(){
        let self =  this;
        this.http.get(this.filterURL)
            .toPromise()
            .then(response =>{
                self.filters = response.json();
                self.getAgeFilter();
                this.getGearedValue();
            }
        ).catch(error => console.error('An error occurred', error));
    }

    getAgeFilter(){
        let ageFilter = this.filters.find((filter) =>
            filter.name === 'age'
        );

        if(ageFilter){
            this.ageFilter =  ageFilter.values;
            let digitA,digitB;
            let numberA = 0 ,numberB = 0;
            this.ageFilter.sort((a, b) => {
                //parseInt("11+".match(/^[0-9]+/)[0])
                digitA = a.display.match(/^[0-9]+/);
                if(digitA.length > 0){
                    numberA = parseInt(digitA[0])
                }
                digitB = b.display.match(/^[0-9]+/);
                if(digitB.length > 0){
                    numberB = parseInt(digitB[0])
                }
                if ( numberA < numberB)
                    return -1;
                if ( numberA > numberB )
                    return 1;
                return 0;
            });

        }
    }
    getGearedValue(){
        let gearsFilter = this.filters.find((filter) =>
            filter.name === 'gears'
        );
        if(gearsFilter){
            let gears = gearsFilter.values;
            gears.sort((a, b) => {
                //parseInt("11+".match(/^[0-9]+/)[0])
                let numberA,numberB;
                let digitA = a.display.match(/^[0-9]+.?[0-9]*/);
                if(digitA && digitA.length > 0){
                    numberA = parseFloat(digitA[0])
                }
                let digitB = b.display.match(/^[0-9]+.?[0-9]*/);
                if(digitB && digitB.length > 0){
                    numberB = parseFloat(digitB[0])
                }
                if(digitA == null){
                    return -1;
                }
                if ( numberA < numberB)
                    return -1;
                if ( numberA > numberB )
                    return 1;
                return 0;
            });
            for(let gear of gears){
                if(gear.display.toLowerCase() != "single speed" && gear.display != '') {
                    if(this.gearValue !== ''){
                        this.gearValue = this.gearValue + ',' + gear.id;
                    }else{
                        this.gearValue = gear.id;
                    }
                }
            }
        }
    }
}
