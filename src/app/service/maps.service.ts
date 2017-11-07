import { Injectable} from '@angular/core';
import { AgmCoreModule,MapsAPILoader } from '@agm/core';

import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class MapsService {
    private distances = [];
    private _navItem = 0;
    navChange$: Observable<string>;
    private _observer;

    constructor(private __loader: MapsAPILoader) {
       /* this.navChange$ = new Observable(observer =>
            this._observer = observer).share();
        // share() allows multiple subscribers*/

    }

    getGeocoding(address: string,region: string) {
        return Observable.create(observer => {
            try {
                //at this point the variable google may be still undefined (google maps scripts still loading)
                //so load all the scripts, then...
                this.__loader.load().then(() => {
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode( {'address':address,'region':region}, (results, status) => {

                        if (status === google.maps.GeocoderStatus.OK) {
                            let lat = results[0].geometry.location.lat();
                            let lng = results[0].geometry.location.lng();
                            let location = results[0].geometry.location;

                            observer.next(location);
                            observer.complete();
                        } else {
                            console.error('Error - ', results, ' & Status - ', status);
                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                observer.error('Address not found!');
                            }else {
                                observer.error(status);
                            }

                            observer.complete();
                        }
                    });
                });
            } catch (error) {
                observer.error('error getGeocoding' + error);
                observer.complete();
            }

        });
    }

    getLatLngLocation(lat,long){
        return new google.maps.LatLng(lat, long);

        //geocoder.geocode( { 'latLng': yourLocation }, (results, status) => {

    }

    getDistance(stores,origin){
        // calc distance
        //origin = new google.maps.LatLng(lat, lng);
        var service = new google.maps.DistanceMatrixService();
        let self = this;
        stores.forEach((element,index) => {
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [new google.maps.LatLng(element.lat,element.lng)],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, (response, status) => {
                if (status != google.maps.DistanceMatrixStatus.OK) {

                } else {
                    stores[index].distance = response.rows[0].elements[0].distance.text;

                }
            });
        });
        return stores;
        //dest = new google.maps.LatLng(v.lat,v.lng);
        // set km / miles language
       // themiles = v.titlemiles;
       // thekm = v.titlekm;

    }

    createInfoWindow(){
        return new google.maps.InfoWindow({
            maxWidth: "400",
            content: ''
        });
    }

    autocomplete(inputId) {
        this.__loader.load().then(() => {
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById(inputId), {});
    /*        google.maps.event.addListener(autocomplete, 'place_changed', () => {
                this._zone.run(() => {
                    //EMIT event from service
                    var place = autocomplete.getPlace();
                    this._navItem = place;
                    this._observer.next(place);
                    *//*
                     this.markers.push({
                     lat: place.geometry.location.lat(),
                     lng: place.geometry.location.lng(),
                     label: place.name,
                     });

                     this.lat = place.geometry.location.lat();
                     this.lng = place.geometry.location.lng();

                     console.log(place);*//*
                })
            });;*/
        });
    }
}