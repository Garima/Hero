import { Component, OnInit,HostBinding,Inject } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { fadeInAnimation } from '../../animations';
import { Router, NavigationEnd } from '@angular/router';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
    animations: [fadeInAnimation]
})
export class MainComponent implements OnInit {
    topSelling = null;
    newLaunch = null;
    homepageData=null;
@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
//  @HostBinding('style.position')  position = 'relative';
  constructor(private http: Http,
              router: Router,
              private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any
              ) {
    PageScrollConfig.defaultScrollOffset = 50;
    PageScrollConfig.defaultDuration = 200;
    PageScrollConfig.defaultEasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
};
      router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
          const tree = router.parseUrl(router.url);
          if (tree.fragment) {
              const element = document.querySelector("#" + tree.fragment);
              setTimeout(()=>{
                if(element) {
                    let pageScrollInstance:PageScrollInstance = PageScrollInstance.simpleInstance(this.document, "#" + tree.fragment);
                    this.pageScrollService.start(pageScrollInstance);
                    // element.scrollIntoView(element);
                }
               },600);
setTimeout(()=>{
    if(element) {
        let pageScrollInstance:PageScrollInstance = PageScrollInstance.simpleInstance(this.document, "#" + tree.fragment);
        this.pageScrollService.start(pageScrollInstance);
        // element.scrollIntoView(element);
    }
},900);
            }
          }

  });}

  ngOnInit() {
      this.getData();
  }
getData(){

    this.http.get(environment.apiHost+'/api/web/home/getdata')
        .toPromise()
        .then(response => {
            this.homepageData = response.json();
            if(this.homepageData.newlylaunched){
                this.newLaunch =  this.homepageData.newlylaunched;
            }
            if(this.homepageData.topViewed){
                this.topSelling =  this.homepageData.topViewed;
            }
        }
    ).catch(error => console.error('An error occurred', error));
   // http://hero.i22.in/api/web/home/getdata
}
}
