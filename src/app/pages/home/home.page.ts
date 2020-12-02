import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

// Importe de servicio
import { AuthServiceService } from '../../services/auth-service.service';
import { GeolocationServiceService } from '../../services/geolocation-service.service';
import { MarketServiceService } from '../../services/market-service.service';

// Importar route
import { Router } from '@angular/router';


// Importe firebase
import { Mercado } from '../../interfaces/mercado.interface';
import { Observable } from 'rxjs';


// Compartir
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

// servicio Datalocal
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSegment, null) segment: IonSegment;

  public categorias = [
    {
      valor: -1,
      tipo: 'Todos',
      icono: '../../../assets/marker/m_pyme.ico'
    },
    {
      valor: 0,
      tipo: 'Pymes',
      icono: '../../../assets/marker/m_pyme.ico'
    },
    {
      valor: 1,
      tipo: 'Mercados',
      icono: '../../../assets/marker/m_mercado.ico'
    },
    {
      valor: 2,
      tipo: 'Farmacias',
      icono: '../../../assets/marker/m_farmacia.ico'
    },
    {
      valor: 3,
      tipo: 'Supermercados',
      icono: '../../../assets/marker/m_smercado.ico'
    },
    {
      valor: 4,
      tipo: 'Fruterias',
      icono: '../../../assets/marker/m_verdureria.ico'
    },
    {
      valor: 5,
      tipo: 'Carnicerias',
      icono: '../../../assets/marker/m_carniceria.ico'
    },
    {
      valor: 6,
      tipo: 'Ferreterias',
      icono: '../../../assets/marker/m_ferreteria.ico'
    },
    {
      valor: 7,
      tipo: 'Licorerias',
      icono: '../../../assets/marker/m_licoreria.ico'
    },
    {
      valor: 8,
      tipo: 'Restaurantes',
      icono: '../../../assets/marker/m_carniceria.ico'
    }
  ];


  logAuth: any;
  public markets: Observable<Mercado[]>;
  public market: Mercado;
  public buscquedas: Observable<Mercado[]>;

  public position = {
    latitud: 0,
    longitud: 0
  };

  constructor( public actionSheetCtrl: ActionSheetController,
               public router: Router,
               public authservice: AuthServiceService,
               public marketService: MarketServiceService,
               public geolocationservice: GeolocationServiceService,
               private dataLocalService: DataLocalService,
               private socialSharing: SocialSharing ) {
    this.logAuth = this.authservice;
  }

  ngOnInit() {
    // this.segment.value = this.categorias[0].tipo;
    this.geolocationservice.getGeoLocation();
    this.markets = this.marketService.getMarkets();
  }

  actualizarPosition() {
    this.geolocationservice.getGeoLocation();
  }
  getTodos() {
    this.markets = this.marketService.getMarkets();
  }

  filtroTipo(par: number) {
    if (par === -1) {
      this.getTodos();
    } else {
      this.markets = this.marketService.getConsultaTipo(par);
    }
  }

  buscarMercado(mer: any) {
    let busqueda = mer.target.value.toUpperCase();
    this.buscquedas = this.marketService.buscarMercado(busqueda);
  }
  abrirMercado(id: string) {
    this.router.navigate(['home/', id ]);
  }

  async presentActionSheet(id: string) {
    this.marketService.getMarket(id).subscribe(market => {
      this.market = market;
    });
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Mercado',
      backdropDismiss: false,
      buttons: [{
        text: 'Abrir mercado',
        icon: 'chevron-forward-circle',
        handler: () => {
          this.router.navigate(['/home/', id ]);
        }
      }, {
        text: 'Compartir',
        icon: 'chatbubbles',
        handler: () => {
          this.socialSharing.share(
            'Te invito a visitar este(a) ' + this.market.tipo + ', Se llama ' + this.market.nombre +
            ' y lo encontré en la app de MARKETMAP, si no la tienes aún bájatela ya!! :)',
            this.market.tipo,
            '',
            'También te envio su dirección: ' + this.market.direccion +
            '. Vamos, visítala!!. Link: https://www.google.com/maps/@' + this.market.latitud + ',' +
            this.market.longitud + ',16.5z?hl=es'
          );
        }
      }, {
        text: 'Añadir a Favoritos',
        icon: 'heart',
        handler: () => {
          console.log('Click Favoritos');
          this.dataLocalService.guardarMercado(this.market);
        }
      }, {
        text: 'Cerrar Opciones',
        icon: 'close-circle',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
