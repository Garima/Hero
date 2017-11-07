import { Component, OnInit,Input } from '@angular/core';
import { SiteNavigationService } from '../../service/site-navigation.service';
import { MatchMediaService } from '../../service/match-media-service.service';
import {NavMenuItem } from '../../model/nav-menu-item';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit {
    menu:NavMenuItem[];
    showNav:boolean = false;
    IsMobile: Boolean = false;
    @Input() forceCloseNav = false;

    constructor(private siteNavigationService: SiteNavigationService,private matchMediaService: MatchMediaService) {
  }

  ngOnInit(): void  {
      this.getNav();
      this.IsMobile = this.matchMediaService.IsSmall();

  }
    ngOnChanges(changes) {
        if(this.IsMobile) {
            for (let propName in changes) {
                if (propName = "forceCloseNav") {
                    this.showNav = false;
                }
            }
        }
    }
    onResize(e){
        this.IsMobile = this.matchMediaService.IsSmall();

    }
    getNav(): void {
        this.siteNavigationService.getSiteNav().then(items => {
                this.menu = items;
                this.menu.sort((a: any, b: any) => {
                    if (a.ord < b.ord) {
                        return -1;
                    } else if (a.ord > b.ord) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        );
    }
    toggleNav(){
        this.showNav = !this.showNav;
        console.log(this.showNav);
        if(this.IsMobile) {
            if (this.showNav) {
                document.getElementsByTagName('html')[0].style.overflowY = "hidden";
            } else {
                document.getElementsByTagName('html')[0].style.overflowY = "auto";
            }
        }
    }
}
