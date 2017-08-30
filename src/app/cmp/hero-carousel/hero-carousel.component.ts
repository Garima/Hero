//NOTE: Carousel USED has been modified in node_modules
import { Component, OnInit } from '@angular/core';

import { GetLocalJsonData } from '../../service/get-local-JSON-data.service';
import "snapsvg-cjs";
declare var Snap: any;
declare var mina: any;

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit {
    heroData = null;
    errorMessage;
    activeSlide =0;
  constructor(private getLocalData: GetLocalJsonData) { }

  ngOnInit() {
      this.getLocalData.getFile('hp-hero.json').subscribe((data) => {
              this.heroData = data;
          }, error => this.errorMessage = <any>error
      );
     // this.animateSlide(1,'#animated-svg-','#loading_circle_over_');
  }
    animateSlide1(ev){
        this.animateSlide(ev,'#animated-svg-','#loading_circle_over_');
        //console.log(ev);

    }
    //Create svg
    animateSlide(index,svgId,circleOverId) {
        this.activeSlide = index;
      //  $(circleOverId+index).attr("class", 'stroke stroke-color-over');
 let sliderTime = 10000;
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
 }/*


 animateSlide(featuredSliderCurrent,'#animated-svg-','#loading_circle_over_');
 resetSlideState(slideIndex,'#loading_circle_over_');

 function animateSlide(index,svgId,circleOverId)
 {
    $(circleOverId+index).attr("class", 'stroke stroke-color-over');

    animatingSvg = Snap(svgId+index);
    loadingCircle = animatingSvg.select(circleOverId+index);
    var circumf = Math.PI*(loadingCircle.attr('r')*2);

    loadingCircle.attr({
        'stroke-dasharray': circumf+' '+circumf,
        'stroke-dashoffset': circumf
    });

    var strokeOffset = loadingCircle.attr('stroke-dashoffset').replace('px', '');
    globalAnimation = Snap.animate(strokeOffset, '0', function( value ){
            loadingCircle.attr({ 'stroke-dashoffset': value })
        }, sliderTime, mina.linear
    );
}

    function resetSlideState(index,circleOverId)
{
    $(circleOverId+index).attr("class", 'stroke');
}

    function stopSliders()
{
    clearInterval(featuredSlider);
    clearInterval(shopSlider);
}

    function slideRight()
{
    $.fn.fullpage.moveSlideRight();
}

    function startFeaturedSlider()
{
    featuredSlider	= setInterval(slideRight,sliderTime);
}

    function startShopSlider()
{
    shopSlider		= setInterval(slideRight,sliderTime);
}*/

}
