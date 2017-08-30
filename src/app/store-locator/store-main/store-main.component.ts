import { Component,OnInit,ViewChild,ViewChildren,QueryList,ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AgmInfoWindow } from '@agm/core/directives/info-window';

import { MapsService } from '../../service/maps.service';

import { Headers, Http, URLSearchParams } from '@angular/http';
declare var google: any;
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    iconUrl: string;
}
@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.scss']
})

export class StoreMainComponent implements OnInit {
@ViewChild('storeMap') storeMap: any;
@ViewChild('addressInput') addressInput: any;
      @ViewChildren(AgmInfoWindow) private infoWindows: Array<AgmInfoWindow>;

    lat:number = 33.8683;
    lng:number = 151.2086;
    myOptions = {
        zoom: 6
        // center: latlng,
        //mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    results = null;
    address;
    google:any;
    mapZoom:number = 6;
    markers = [];
    mapLoading= true;
    selectedStore=-1;
    classToScrollTo = 'active';
    arInfoWindow = [];
    infoWindowOpened = null;
    hasStores = true;
    currentAddress='';
    //Your entered address' - TODO

    constructor(private maps:MapsService,
                private cdRef: ChangeDetectorRef,
                private http: Http) {
    }

    ngOnInit() {
        this.address = "Delhi";
        this.gmap_location_lookup('Delhi',10,'India');
        this.currentAddress ='Delhi';
        this.maps.autocomplete('address');
        /*let self = this;
        this.subscription = this.maps.navChange$.subscribe(
                item => {
                    self.addressChanged();console.log(item);
                });*/
    }

    addressChanged(){
        if(this.addressInput.nativeElement)
            this.address = this.addressInput.nativeElement.value;

        if (this.address != '' && this.address !== this.currentAddress) {
            this.results = null;
            this.markers = [];
            this.mapLoading = true;
            this.gmap_location_lookup(this.address, 10, '');
        }
    }

    pushMarkers(){
        this.markers = [];
        this.results.forEach((element,index) => {
            this.markers.push({
                lat:Number(element.lat),
                lng:Number(element.lng),
                label:(index+1).toString(),//String.fromCharCode("A".charCodeAt(0) + (index)),
                draggable:false,
                info:{
                    name:element.name,
                    telephone:element.telephone,
                    address:element.address
                }
            })
        });
    }

    clickedMarker(infoWindow, index: number) {

        if( this.infoWindowOpened ===  infoWindow)
            return;

        if(this.infoWindowOpened !== null)
            this.infoWindowOpened.close();

        this.infoWindowOpened = infoWindow;
        this.infoWindowOpened.open();
        /*this.infoWindow.setContent(info_window_string);
        this.infoWindow.open(this.storeMap,marker);*/

        this.selectedStore = index;
        this.doScroll(index);
    }

    storeClick(index){
        if(this.arInfoWindow.length < 1) {
            this.infoWindows.forEach((iWindow) => {
                this.arInfoWindow.push(iWindow);
            });
        }
        this.clickedMarker(this.arInfoWindow[index], index)
    }

    gmap_location_lookup(address, distance, region) {

        if (region == null || region == '') {
            region = 'India';
        }

        let distancecode = 1;
            let self = this;
            this.maps.getGeocoding(address,region).subscribe(function (location) {
                self.lat = location.lat();
                self.lng = location.lng();
                self.mapZoom = 11;
                self.cdRef.detectChanges();
                self.storeMap.triggerResize();

                var number = 0;
                self.http.get(environment.apiHost+'/api/web/storefinder?latitude='+ self.lat + '&longitude=' + self.lng + '&distance=50')
                    .subscribe((response) => {
                        let data =  response.json();

                        if(data.success > 0){
                            self.hasStores = true;
                            self.results = data.stores;
                            self.maps.getDistance(self.results,location);
                           self.results.sort((n1,n2) => {
                                return n1.distance - n2.distance;
                            });
                            self.pushMarkers();
                            self.arInfoWindow =[];
                            self.storeMap.triggerResize();

                        }else{
                            self.hasStores = false;
                        }
                        self.mapLoading = false;

                        self.cdRef.detectChanges();


                    }, error => this.errorMessage = <any>error
                );

            });




    }

    doScroll(storeId) {

        try {
            var element = document.getElementById('store_'+storeId);
            if (!element) {
                return;
            }
            let list = document.getElementById('store-list');
           list.scrollTop = element.offsetTop - list.offsetTop;
            //element.scrollIntoView();
        }
        finally{
           // this.classToScrollTo = null;
        }
    }


}
