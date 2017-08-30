import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {NavMenuItem } from '../../model/nav-menu-item';
import { SiteNavigationService } from '../../service/site-navigation.service';

@Component({
  selector: 'app-brand-main',
  templateUrl: './brand-main.component.html',
  styleUrls: ['./brand-main.component.scss']
})
export class BrandMainComponent implements OnInit {
    menu;//:NavMenuItem;
    private brand: any;

  constructor( private siteNavigationService: SiteNavigationService,
               private route: ActivatedRoute,
               private location: Location,
               private router: Router) {

  }

  ngOnInit() {
      this.getNav();
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
