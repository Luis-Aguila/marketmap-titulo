import { Component, OnInit } from '@angular/core';

// Importe de servicio Auth
import { AuthServiceService } from '../../services/auth-service.service';
import { MarketServiceService } from '../../services/market-service.service';


// Importe firebase
import { Mercado } from '../../interfaces/mercado.interface';
import { Observable } from 'rxjs';
import { DataLocalService } from '../../services/data-local.service';

// Import Router
import { Router } from '@angular/router';
// Import Mensaje
import { ToastController } from '@ionic/angular';
// Import Geolocalizacion
import { GeolocationServiceService } from 'src/app/services/geolocation-service.service';

// importa alert
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.page.html',
  styleUrls: ['./perfil-user.page.scss'],
})
export class PerfilUserPage implements OnInit {

  logAuth: any;
  propietario: any;
  private markets: Observable<Mercado[]>;
  private marketslocal;
  public propiosMarkets: Observable<Mercado[]>;
  cantidadpropios: number;

  constructor(private authservice: AuthServiceService,
              public marketService: MarketServiceService,
              public dataLocalService: DataLocalService,
              private toastCtrl: ToastController,
              private router: Router,
              public geolocationservice: GeolocationServiceService,
              public alertController: AlertController) {
    this.logAuth = this.authservice;
  }

  ngOnInit() {
    this.authservice.user.subscribe( user => {
      this.propiosMarkets = this.marketService.cargarPropios(user.uid);
      this.propiosMarkets.subscribe( market => {
        this.cantidadpropios = market.length;
      });
    });

    // this.propietario = this.authservice.capturarUID();

    // this.propietario = this.authservice.afAuth.currentUser;

    // this.authservice.user.subscribe( us => this.propietario = us.uid);
    // console.log(this.propietario);
    
  }

  async alertEliminarMercado(id: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Está seguro de eliminar este mercado? Una vez lo elimine, también eliminara los datos relacionados a este negocio.',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteMercado(id);
          }
        }
      ]
    });

    await alert.present();
  }


  async alertEliminarFavorito(favorito: Mercado) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Está seguro de eliminar este mercado de sus Favoritos?',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteFavorito(favorito);
          }
        }
      ]
    });

    await alert.present();
  }

  async mensajeNegocio() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'A alcanzado el limite máximo de negocios a agregar!',
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });

    await alert.present();
  }

  abrirFavorito(id: string) {
    this.router.navigate(['home/', id ]);
  }

  deleteMercado(id: string) {
      this.marketService.eliminarMercado(id).then(() => {
        this.router.navigateByUrl('/perfil-user');
        this.showToast('Su mercado a sido eliminado');
      }, err => {
        this.showToast('A habido un problema al eliminar el mercado seleccionado.');
      });
  }

  deleteFavorito(favorito: Mercado) {
    this.dataLocalService.borrarFavorito(favorito);
  }

  modificarMercado(id: string) {
    this.router.navigate(['/perfil-user/', id ]);
  }


  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  irMarketMapa(lat: number, lng: number) {
    this.geolocationservice.setPositionMarket(lat, lng);
    this.router.navigate(['/home']);
  }

}
