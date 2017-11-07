import { Component } from '@angular/core';
import { NavigationStart,NavigationEnd } from '@angular/router';
// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';
import { slideInAnimation } from './animations';
import { MatchMediaService } from './service/match-media-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
    // make slide in/out animation available to this component
    //animations: [slideInDownAnimation],

    // attach the slide in/out animation to the host (root) element of this component
   // host: { '[@slideInDownAnimation]': '' }
})
export class AppComponent {
  title = 'Hero Cycles';
    forceCloseNav=false;
    minBodyHeight;
    constructor(private matchMediaService: MatchMediaService){
        this.minBodyHeight = window.innerHeight;
    }
    onDeactivate() {
        //this.forceCloseNav = false;
    }
    onActivate() {
        this.forceCloseNav = !this.forceCloseNav;
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
    onResize(e) {
        this.minBodyHeight = window.innerHeight;
    this.matchMediaService.onResize(e);
    }
}


