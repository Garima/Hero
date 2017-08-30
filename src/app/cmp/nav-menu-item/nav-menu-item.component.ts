import { Component, OnInit, Input } from '@angular/core';
import { MatchMediaService } from '../../service/match-media-service.service';

@Component({
  selector: 'app-nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.scss']
})
export class NavMenuItemComponent implements OnInit {
    @Input() menu;
    subNavVisible:boolean;
    cycleWidth:number;
    IsMobile: Boolean = false;
    IsDesktop: Boolean = true;
  constructor(private matchMediaService: MatchMediaService) { }

  ngOnInit() {
      this.subNavVisible = false;
      this.IsMobile = (this.matchMediaService.IsSmall());
      this.IsDesktop = (this.matchMediaService.IsLarge());
      if(this.menu.sub_categories && this.menu.sub_categories.length > 0){
          this.cycleWidth = 100/this.menu.sub_categories.length
      }
  }
    hoverNav(){
        if(this.IsMobile){
            return;
        }
        this.subNavVisible= true;
    }

    hoverOutNav(){
        if(this.IsMobile){
            return;
        }
        this.subNavVisible= false;
    }

    closeNav(){
        this.subNavVisible= false;
    }

    toggleSubNav(){
        this.subNavVisible= !this.subNavVisible;
    }
}
