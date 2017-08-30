import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { MatchMediaService } from '../../service/match-media-service.service';
import {Search } from '../../model/search';

import {NavMenuItem } from '../../model/nav-menu-item';
import { SiteNavigationService } from '../../service/site-navigation.service';

@Component({
  selector: 'app-cycle-of-choice',
  templateUrl: './cycle-of-choice.component.html',
  styleUrls: ['./cycle-of-choice.component.scss']
})
export class CycleOfChoiceComponent implements OnInit {
    cycleFilter;//:NavMenuItem[];
    ageValue = null;
    IsMobile: Boolean = false;
    IsDesktop: Boolean = true;
    criterion: Search = new Search();
    pageShown = 1;
    errorFilter:string =  null;
ageFilter = [
    {id:1,value:1,displayText:'1 to 3'},
    {id:2,value:2,displayText:'2 to 4'},
    {id:3,value:3,displayText:'3 to 5'},
    {id:4,value:4,displayText:'5 to 7'},
    {id:5,value:5,displayText:'6 to 8'},
    {id:6,value:6,displayText:'7 to 9'},
    {id:7,value:7,displayText:'9 to 12'},
    {id:8,value:8,displayText:'12+'}
];
    priceFilter = [
        {id:1,value:1,displayText:'1500-2000'},
        {id:2,value:2,displayText:'2000-2500'},
        {id:3,value:3,displayText:'3000-3500'},
        {id:4,value:4,displayText:'3500-4000'},
        {id:5,value:5,displayText:'4000-5000'},
        {id:6,value:6,displayText:'5000-6500'},
        {id:7,value:7,displayText:'6500-8000'},
        {id:8,value:8,displayText:'8000-11000'},
        {id:9,value:9,displayText:'15000+'}
    ];
  constructor(private matchMediaService: MatchMediaService,
              private siteNavigationService: SiteNavigationService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
      this.IsMobile = (this.matchMediaService.IsSmall());
      this.IsDesktop = (this.matchMediaService.IsLarge());
      this.pageShown =1;
  }
    showNext(filtersToValidate){
        //show next page - 2 in mobile 1 in large
        //apply validation if one from each is selected
        if(this.validateFilter(filtersToValidate)){
            this.pageShown++;

        }
    }
    searchProduct(filtersToValidate){
        //serach product with all given filters
        //usually it should result in one unique product
        //ASK - where it need to go directly to Prod page?
        this.validateFilter(filtersToValidate);
        //Object.keys(this.criterion).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(this.criterion[k])}`).join('&');
        this.router.navigate(['/search'], { queryParams: this.criterion });

    }
    onSelectionChange(entry,type) {
        this.criterion[type] = entry;
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
    onTypeChange(entry,type){
        //get subnav fo it
        //and
        this.criterion[type] = entry;
        this.getCycleFilter(entry);
    }
    getCycleFilter(brand): void {
        this.siteNavigationService.getBrandData(brand).then(items =>
            this.cycleFilter = items.sub_categories
        );
    }
}
