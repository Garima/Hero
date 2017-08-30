import { Component, OnInit } from '@angular/core';
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

    constructor(private siteNavigationService: SiteNavigationService,private matchMediaService: MatchMediaService) {
  }

  ngOnInit(): void  {
      this.getNav();
      this.IsMobile = this.matchMediaService.IsSmall();
  }
    getNav(): void {
        this.siteNavigationService.getSiteNav().then(items =>
            this.menu = items
        );
    }
    toggleNav(){
        this.showNav = !this.showNav;
    }
}
