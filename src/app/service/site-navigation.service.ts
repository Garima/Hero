import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { NavMenuItem } from '../model/nav-menu-item';
//import { NavSubMenuItem } from '../model/nav-sub-menu-item';

@Injectable()
export class SiteNavigationService {
    private naviUrl = 'http://hero.i22.in/api/web/getnavibar';  // URL to web api
    private navData;

    constructor(private http: Http) { }

    getSiteNav(): Promise<any[]> {
        if(!this.navData) {
            this.navData = this.http.get(this.naviUrl)
                .toPromise()
                .then(response =>
                    response.json()

            ).catch(this.handleError);
        }
        return this.navData;
    }
    getBrandData(brand: string): Promise<any> {
        return this.getSiteNav()
            .then(items =>
                items.find(item => item.link === brand)
        );//change to name link
    }

    getCategoryData(brand: string,cat: string): Promise<any> {
        return this.getBrandData(brand)
            .then(items =>
                items.sub_categories.find(item => item.link === cat)
        );//change to name link
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
