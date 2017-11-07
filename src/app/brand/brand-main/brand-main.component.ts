import { Component, OnInit,ViewChild, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { fadeInAnimation } from '../../animations';
import {NavMenuItem } from '../../model/nav-menu-item';
import { SiteNavigationService } from '../../service/site-navigation.service';

@Component({
  selector: 'app-brand-main',
  templateUrl: './brand-main.component.html',
  styleUrls: ['./brand-main.component.scss'],
    animations: [fadeInAnimation]
})
export class BrandMainComponent implements OnInit {
    menu;//:NavMenuItem;
    private brand: any;
    pillarHeight:number = 100;

@ViewChild('bannerVideo') bannerVideo: any;
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor( private siteNavigationService: SiteNavigationService,
               private route: ActivatedRoute,
               private location: Location,
               private router: Router) {

  }

  ngOnInit() {
      this.getNav();
      this.pillarHeight = window.innerHeight - 100;
  }
    onResize(e) {
        this.pillarHeight = window.innerHeight - 100;
    }
    getNav(): void {
        let self = this;
        this.brand = this.route.params
        .switchMap((params: Params) =>
                self.siteNavigationService.getBrandData(params['brand'])
        )
        .subscribe(brand => {
                self.menu = brand;
                if(!brand) {
                    this.router.navigate(['./404']);
                    return;
                }

                self.menu.sub_categories.sort((a: any, b: any) => {
                    if (a.ord < b.ord) {
                        return -1;
                    } else if (a.ord > b.ord) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                if(self.bannerVideo) {
                    self.bannerVideo.nativeElement.load();
                }
            }
        );
    }
    goBack(): void {
        this.location.back();
    }
    ngOnDestroy() {
        this.brand.unsubscribe();
    }
}
