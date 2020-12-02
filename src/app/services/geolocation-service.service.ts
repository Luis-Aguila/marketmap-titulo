import { Injectable } from '@angular/core';

// Importacion modulo
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationServiceService {

  public position = {
    latitud: 0,
    longitud: 0
  };

  public positionMarket = {
    latitud: 0,
    longitud: 0
  };

  constructor( private geolocation: Geolocation ) { }

  getGeoLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.position.latitud = resp.coords.latitude;
      this.position.longitud = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  setPositionMarket(lat: number, lng: number) {
    this.positionMarket.latitud = lat;
    this.positionMarket.longitud = lng;
  }
}
