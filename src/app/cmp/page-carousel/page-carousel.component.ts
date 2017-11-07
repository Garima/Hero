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
    onResize(e){
        this.IsMobile = (this.matchMediaService.IsSmall());
        this.IsDesktop = (this.matchMediaService.IsLarge()|| this.matchMediaService.IsTablet());
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

    populateData(productData){
        this.quickViewProductData = productData;
    }
}
