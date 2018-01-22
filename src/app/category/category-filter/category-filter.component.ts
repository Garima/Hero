import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatchMediaService } from '../../service/match-media-service.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { slideInAnimation } from '../../animations';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
    animations:[slideInAnimation]
})

export class CategoryFilterComponent implements OnInit {
    filterURL = environment.apiHost + '/api/web/getfilters';
    IsMobile: boolean = false;
    IsDesktop: boolean = true;
    filters;
    showFilterOptions:boolean = false;
    filterOpen:boolean = false;
    selectedOptions=[];
    filterSelected = 0;
    isDataChanging = false;
    @Input() filtersSelected;
    @Input() defaultFilterOpen:boolean = false;
    @Input() sortOrder="asc";
    @Output() criterionChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() sortChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() clearAll: EventEmitter<any> = new EventEmitter<any>();

  constructor(private matchMediaService: MatchMediaService,
              private http: Http) { }

      ngOnInit(){

          this.IsMobile = (this.matchMediaService.IsSmall());
          this.IsDesktop = (this.matchMediaService.IsLarge());
          if(this.IsDesktop){
              this.filterOpen = true;
          }

          this.getFilter();
      }
    ngOnChanges(changes) {
        for (let propName in changes) {
            if(propName = "filtersSelected" && this.filters){
                this.fillFilterOptions();
                this.setSelected();
            }
        }
    }

    onResize(e){
        this.IsMobile = this.matchMediaService.IsSmall();
        this.IsDesktop = this.matchMediaService.IsLarge();
        this.filterOpen = this.IsDesktop;

    }

    sortBy(filter,dir) {
        let criterion = {filter:filter,direction:dir};
        this.sortChanged.emit(criterion);
    }

    getFilter(){
        this.http.get(this.filterURL)
            .toPromise()
            .then(response => {
                this.filters = response.json();
                let digitA,digitB,numberA,numberB;
                for(let filter of this.filters){
                    if(filter.name == "age" || filter.name == "gears" || filter.name == "size" ){
                        filter.values.sort((a, b) => {
                            //parseInt("11+".match(/^[0-9]+/)[0])
                            digitA = a.display.match(/^[0-9]+.?[0-9]*/);
                            if(digitA && digitA.length > 0){
                                numberA = parseFloat(digitA[0])
                            }
                            digitB = b.display.match(/^[0-9]+.?[0-9]*/);
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
                    }else{
                        filter.values.sort((a, b) => {
                            if ( a.display < b.display)
                                return -1;
                            if ( a.display > b.display )
                                return 1;
                            return 0;
                        });

                    }

                }
                if(this.defaultFilterOpen && this.filtersSelected) {
                  //  this.showFilter(this.filtersSelected[0].filterName);
                }
                this.fillFilterOptions();
                this.setSelected();
            }
        ).catch(error => console.error('An error occurred', error));
    }

    showFilter(filterId){
        this.isDataChanging = true;
        if(this.filterSelected === filterId || this.filterSelected === 0){
            this.showFilterOptions = !this.showFilterOptions
        }

        this.filterSelected = filterId;
        if(this.showFilterOptions){
            this.selectedOptions = this.filters.find(filter => filter.name === filterId).values;

        }else{
            this.filterSelected = 0;
        }
        this.isDataChanging= false;
    }

    toggleCriterion(filter,optionValue){
        let criterion = {filter:filter,option:optionValue};
        this.criterionChanged.emit(criterion);
    }

    toggleFilter(){
        this.filterOpen = !this.filterOpen;
    }

    clearAllCriterion(optionValue){
        this.clearAll.emit();
    }

    setSelected(){
    var self = this;
        for (let filter of this.filters) {
        if(this.filtersSelected && this.filtersSelected.length > 0) {
            let selFilter = self.filtersSelected.find((filter1) => {
                return filter1.filterName.toLowerCase().trim() === filter.name.toLowerCase().trim();
            });

            if (selFilter) {
                for (let option of filter.values ) {
                    let selOption = selFilter.selectedValue.find((optionSel) => {
                        if (isNaN(optionSel) && isNaN(option.id)) {
                            return optionSel.toLowerCase().trim() == option.id.toLowerCase().trim();
                        } else {
                            return option.id == optionSel;
                        }
                    })
                    if (selOption) {
                        option.isSelected = true;
                    } else {
                        option.isSelected = false;
                    }
                }

            } else {
                for (let option of filter.values ) {
                    option.isSelected = false;
                }
            }
        }else{
            for (let option of filter.values ) {
                option.isSelected = false;
            }
        }
    }
}

    fillFilterOptions(){
        let criterValue;
        if(this.filtersSelected && this.filtersSelected.length > 0) {
            for (let filter of this.filtersSelected ) {
                let isAFilter = this.filters.find((filter1) => {
                    return filter1.name.toLowerCase() == filter.filterName.toLowerCase();
                });
                if (typeof(isAFilter) != "undefined") {
                    filter.texts = [];
                    for (let criter of
                    filter.selectedValue
                )
                    {
                        criterValue = this.getCriterionName(filter.filterName, criter);
                        filter.texts.push({'id': criter, 'text': criterValue});
                    }
                }
            }
        }
    }

    getCriterionName(filterName,id){
    let criterion=null;
    let isFilterSelected = this.filters.find((filter) => {
        return filter.name.toLowerCase() == filterName.toLowerCase();
    });
    if(isFilterSelected){
        criterion = isFilterSelected.values.find((value) => {
            if(isNaN(id) && isNaN(value.id)) {
                return value.id.toLowerCase().trim() == id.toLowerCase().trim();
            }else{
                return value.id == id;
            }
        });

    }
    if(criterion != null){
        return criterion.display;
    }
    return '';
}
}
