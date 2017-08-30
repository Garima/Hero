import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {NavMenuItem } from '../../model/nav-menu-item';
import { SiteNavigationService } from '../../service/site-navigation.service';

@Component({
  selector: 'app-cat-level1-main',
  templateUrl: './cat-level1-main.component.html',
  styleUrls: ['./cat-level1-main.component.scss']
})
export class CatLevel1MainComponent implements OnInit {
    menu;//:NavMenuItem;
    pillarWidth:number = 0;
    pillarHeight:number = 100;
@ViewChild('bannerVideo') bannerVideo: any;

  constructor( private siteNavigationService: SiteNavigationService,
               private route: ActivatedRoute,
               private location: Location,
               private router: Router) { }

  ngOnInit() {
      this.getNav();
this.pillarHeight = window.innerHeight - 50;
  }
    getNav(): void {
        let self = this;
        this.route.params
            .switchMap((params: Params) =>
                self.siteNavigationService.getCategoryData(params['brand'],params['category'])
        )
            .subscribe(category1 => {
                self.menu = category1;
                if(self.menu.brands.length > 0) {
                    self.pillarWidth = (100 / self.menu.brands.length);
                }
                if(self.bannerVideo) {
                    self.bannerVideo.nativeElement.load();
                }
                if (!category1) {
                    this.router.navigate(['./404']);
                }
            }
        );
    }
}
