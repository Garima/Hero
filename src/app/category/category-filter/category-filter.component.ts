import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatchMediaService } from '../../service/match-media-service.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
    filterURL = environment.apiHost + '/api/web/getfilters';
    IsMobile: Boolean = false;
    IsDesktop: Boolean = true;
    @Input() filtersSelected;
    filters;
    showFilterOptions:boolean = false;
    filterOpen:boolean = false;
    selectedOptions=[];
    filterSelected = 0;
    @Output() criterionChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() clearAll: EventEmitter<any> = new EventEmitter<any>();

  constructor(private matchMediaService: MatchMediaService,
              private http: Http) { }

  ngOnInit() {
      this.IsMobile = (this.matchMediaService.IsSmall());
      this.IsDesktop = (this.matchMediaService.IsLarge());
      if(this.IsDesktop){
          this.filterOpen = true;
      }

      this.getFilter();
  }
getFilter(){
    this.http.get(this.filterURL)
        .toPromise()
        .then(response =>
            this.filters = response.json()
    ).catch(error => console.error('An error occurred', error));
}

    showFilter(filterId){
        if(this.filterSelected === filterId || this.filterSelected === 0){
            this.showFilterOptions = !this.showFilterOptions
        }

        this.filterSelected = filterId;
        if(this.showFilterOptions){
            this.selectedOptions = this.filters.find(filter => filter.name === filterId).values;
        }else{
            this.filterSelected = 0;
        }
    }
    toggleCriterion(optionValue){
       // var selectedFilterName = this.filters.find((filter) => {
        //    return filter.id === this.filterSelected
       // });
        let criterion = {filter:this.filterSelected,option:optionValue}
        this.criterionChanged.emit(criterion);
    }
    toggleFilter(){
        this.filterOpen = !this.filterOpen;
    }

    clearAllCriterion(optionValue){
        this.clearAll.emit();
    }

isSelected(optionValue){
    var self = this;
    if(!self.filtersSelected){
        return false;
    }
    let isFilterSelected = self.filtersSelected.find((filter) => {
        return filter.filterName === self.filterSelected;
    });
    let isOptionSelected = false;
    if(isFilterSelected) {
        if(typeof isFilterSelected.selectedValue === 'string'){
            isOptionSelected = isFilterSelected.selectedValue.toLowerCase() == optionValue.toString().toLowerCase();
        }else{
            isOptionSelected = isFilterSelected.selectedValue.indexOf(optionValue.toString())>-1;
        }
    }
    return isOptionSelected;
}

}
