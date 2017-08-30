import { Component, OnInit, Input } from '@angular/core';
import { MatchMediaService } from '../../service/match-media-service.service';

@Component({
  selector: 'app-page-carousel',
  templateUrl: './page-carousel.component.html',
  styleUrls: ['./page-carousel.component.scss']
})
export class PageCarouselComponent implements OnInit {
    @Input() items;
    desktopItems =[];
    itemsToShow;
    quickViewProductData=null;
    IsMobile: Boolean = false;
    IsDesktop: Boolean = true;

  constructor(private matchMediaService: MatchMediaService) { }

  ngOnInit() {
      this.IsMobile = (this.matchMediaService.IsPhone());
      this.IsDesktop = (this.matchMediaService.IsDesktop() || this.matchMediaService.IsTablet());
      this.getDesktopItems();
  }
    getDesktopItems(){
        let count = 0;
        let tempArray = [];
        for(let item of this.items){
            tempArray.push(item);
            count++;
            if(count%2 == 0){
                this.desktopItems.push(tempArray);
                tempArray=[];
            }
        }
        if(tempArray.length>0){
            this.desktopItems.push(tempArray);
        }
    }

//TODO:move
    populateData(productData){
        productData.specifications = [{'name':'Front Brake','description':productData.spec_Front_brake},
            {'name':'Gears','description':productData.spec_Gears},
            {'name':'Front Suspension','description':productData.spec_Front_suspension},
            {'name':'Rear Suspension','description':productData.spec_Rear_suspension},
            {'name':'Rear Deraileur','description':productData.spec_Rear_deraileur}]
        this.quickViewProductData = productData;
    }
}
