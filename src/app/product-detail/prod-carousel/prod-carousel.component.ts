import { Component, OnInit, Input } from '@angular/core';
import { MatchMediaService } from '../../service/match-media-service.service';

@Component({
  selector: 'app-prod-carousel',
  templateUrl: './prod-carousel.component.html',
  styleUrls: ['./prod-carousel.component.scss']
})
export class ProdCarouselComponent implements OnInit {
@Input() prodImages = null;
    IsDesktop: Boolean = false;
  constructor(public matchMediaService: MatchMediaService) { }

  ngOnInit() {
  }

}
