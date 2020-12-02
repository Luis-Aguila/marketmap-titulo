import { Component, OnInit } from '@angular/core';

// Importe
import { ActivatedRoute, Router } from '@angular/router';
import { Mercado } from '../../interfaces/mercado.interface';
import { MarketServiceService } from '../../services/market-service.service';

// llamada
import { CallNumber } from '@ionic-native/call-number/ngx';


// como llegar
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { GeolocationServiceService } from '../../services/geolocation-service.service';


@Component({
  selector: 'app-perfil-market',
  templateUrl: './perfil-market.page.html',
  styleUrls: ['./perfil-market.page.scss'],
})
export class PerfilMarketPage implements OnInit {

  market: Mercado = {
    nombre: '',
    tipo: '',
    detalle: '',
    ofertas: ['', '', ''],
    latitud: null,
    longitud: null,
    propietario: '',
    direccion: '',
    portada: '',
    estado: false,
    atencion: '',
    galeria: ['', '', '', '', ''],
    icon: '',
    contacto: ''
  };

  constructor( private activatedRoute: ActivatedRoute,
               private marketService: MarketServiceService,
               public geolocationservice: GeolocationServiceService,
               private callNumber: CallNumber,
               private launchNavigator: LaunchNavigator ) {
  }

  ngOnInit() {
    this.geolocationservice.getGeoLocation();
  }

  callMercado( telefono: string) {
    this.callNumber.callNumber(telefono, true)
    .then(res => console.log('Llamando...!', res))
    .catch(err => console.log('Error al llamar', err));
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.marketService.getMarket(id).subscribe(market => {
        this.market = market;
      });
    }
  }

  llegarMercado(latitud: number, longitud: number) {
    this.launchNavigator.navigate([latitud, longitud], {
      start: [this.geolocationservice.position.latitud, this.geolocationservice.position.longitud]
    });
  }

}
