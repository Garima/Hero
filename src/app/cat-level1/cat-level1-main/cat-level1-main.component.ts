import { Component, OnInit, ViewChild,HostBinding } from '@angular/core';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { fadeInAnimation } from '../../animations';
import {NavMenuItem } from '../../model/nav-menu-item';
import { SiteNavigationService } from '../../service/site-navigation.service';

@Component({
  selector: 'app-cat-level1-main',
  templateUrl: './cat-level1-main.component.html',
  styleUrls: ['./cat-level1-main.component.scss'],
    animations: [fadeInAnimation]
})
export class CatLevel1MainComponent implements OnInit {
    menu;//:NavMenuItem;
    pillarWidth:number = 0;
    pillarHeight:number = 100;
    private category: any;
    isLoading=false;
    loaderSubs;
@ViewChild('bannerVideo') bannerVideo: any;
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor( private siteNavigationService: SiteNavigationService,
               private route: ActivatedRoute,
               private location: Location,
               private router: Router) { }

  ngOnInit() {
      this.getNav();
      this.pillarHeight = window.innerHeight - 100;
  }
    onResize(e) {
        this.pillarHeight = window.innerHeight - 100;
    }
    getNav(): void {
        let self = this;
        this.category = this.route.params
            .switchMap((params: Params) =>
                self.siteNavigationService.getCategoryData(params['brand'],params['category'])
        )
            .subscribe(category1 => {
                self.menu = category1;

                if (!category1) {
                    this.router.navigate(['./404']);
                    return;
                }
                self.menu.brands.sort((a: any, b: any) => {
                    if (a.ord < b.ord) {
                        return -1;
                    } else if (a.ord > b.ord) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                if(self.menu.brands.length > 0) {
                    self.pillarWidth = (100 / self.menu.brands.length);
                }
                if(self.bannerVideo) {
                    self.bannerVideo.nativeElement.load();
                }
                if (!category1) {
                    this.router.navigate(['./404']);
                }

                this.isLoading=false;
            }
        );
        this.loaderSubs = this.route.params.subscribe(()=>
            this.isLoading=true);
    }

    ngOnDestroy() {
        this.category.unsubscribe();
        this.loaderSubs.unsubscribe();
    }
}
