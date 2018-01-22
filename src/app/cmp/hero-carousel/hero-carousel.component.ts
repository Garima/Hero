//NOTE: Carousel USED has been modified in node_modules
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

//import { GetLocalJsonData } from '../../service/get-local-JSON-data.service';
import "snapsvg-cjs";
declare var Snap: any;
declare var mina: any;

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit {
    private eventsUrl = environment.apiHost + '/api/web/sliders/getall';
    heroData = null;
    errorMessage;
    activeSlide =0;
  constructor(private http: Http) { }
  ngOnInit() {
      /*this.getLocalData.getFile('hp-hero.json').subscribe((data) => {
              this.heroData = data;
          }, error => this.errorMessage = <any>error
      );*/
      this.http.get(this.eventsUrl)
          .toPromise()
          .then(response =>
              this.heroData = response.json()
      ).catch(error => console.error('An error occurred', error));
     // this.animateSlide(1,'#animated-svg-','#loading_circle_over_');
  }
    animateSlide1(ev){
        this.animateSlide(ev,'#animated-svg-','#loading_circle_over_');

    }
    //Create svg
    animateSlide(index,svgId,circleOverId) {
        this.activeSlide = index;
      //  $(circleOverId+index).attr("class", 'stroke stroke-color-over');
 let sliderTime = 3000;
 let animatingSvg = Snap(svgId+index);
        if(animatingSvg) {
            let loadingCircle = animatingSvg.select(circleOverId + index);
            var circumf = Math.PI * (loadingCircle.attr('r') * 2);

            loadingCircle.attr({
                'stroke-dasharray': circumf + ' ' + circumf,
                'stroke-dashoffset': circumf
            });

            var strokeOffset = loadingCircle.attr('stroke-dashoffset').replace('px', '');
            let globalAnimation = Snap.animate(strokeOffset, '0', function (value) {
                    loadingCircle.attr({'stroke-dashoffset': value})
                }, sliderTime, mina.linear
            );
        }
 }

}
