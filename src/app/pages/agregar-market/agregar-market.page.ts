import { Component, OnInit } from '@angular/core';


// Importe Servicios
import { AuthServiceService } from '../../services/auth-service.service';
import { GeolocationServiceService } from '../../services/geolocation-service.service';
import { MarketServiceService } from '../../services/market-service.service';
import { Mercado } from 'src/app/interfaces/mercado.interface';


import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Storage
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-agregar-market',
  templateUrl: './agregar-market.page.html',
  styleUrls: ['./agregar-market.page.scss'],
})
export class AgregarMarketPage implements OnInit {

  mercado: Mercado = {
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

  latMarket: number;
  lngMarket: number;
  propietario: any;

  constructor(public authservice: AuthServiceService,
              public marketService: MarketServiceService,
              public geolocationservice: GeolocationServiceService,
              private toastCtrl: ToastController,
              private router: Router,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.geolocationservice.getGeoLocation();
    this.authservice.capturarDatosUduario();
    this.propietario = this.authservice.usuario.uid;
    this.mercado.propietario = this.propietario;

    const ref = this.storage.ref('portada/cabecera_predeterminado.png');
    ref.getDownloadURL().subscribe(result => {
      this.mercado.portada = result;
    });
    const refg = this.storage.ref('galeria/galeria_predeterminado.png');
    refg.getDownloadURL().subscribe(result => {
      this.mercado.galeria[0] = result;
      this.mercado.galeria[1] = result;
      this.mercado.galeria[2] = result;
      this.mercado.galeria[3] = result;
      this.mercado.galeria[4] = result;
    });

  }

  agregarUbicacionMarket(evento) {
    const coords = evento.coords;
    this.latMarket = coords.lat;
    this.lngMarket = coords.lng;
    this.mercado.latitud = this.latMarket;
    this.mercado.longitud = this.lngMarket;
  }

  agregarMercado() {
    switch (this.mercado.tipo) {
      case 'Mercado':
        this.mercado.icon = '../../../assets/marker/m_mercado.ico';
        break;
      case 'Farmacia':
        this.mercado.icon = '../../../assets/marker/m_farmacia.ico';
        break;
      case 'Supermercado':
        this.mercado.icon = '../../../assets/marker/m_smercado.ico';
        break;
      case 'Fruteria':
        this.mercado.icon = '../../../assets/marker/m_verdureria.ico';
        break;
      case 'Carniceria':
        this.mercado.icon = '../../../assets/marker/m_carniceria.ico';
        break;
      case 'Ferreteria':
        this.mercado.icon = '../../../assets/marker/m_ferreteria.ico';
        break;
      case 'Licoreria':
        this.mercado.icon = '../../../assets/marker/m_licoreria.ico';
        break;
      case 'Pyme':
        this.mercado.icon = '../../../assets/marker/m_pyme.ico';
        break;
      case 'Restaurant':
        this.mercado.icon = '../../../assets/marker/m_carniceria.ico';
        break;
    }


    // this.propietario = this.authservice.afAuth.auth.currentUser.uid;
    this.mercado.nombre = this.mercado.nombre.toUpperCase();
    this.marketService.guardarMercado(this.mercado).then(() => {
      this.router.navigateByUrl('/perfil-user');
      this.showToast('Mercado añadido existosamente - Ahora puedes personalizar tu mercado');
    }, err => {
      this.showToast('A habido un problema al añadir el nuevo mercado');
    });

  }

  guardar() {
    console.log(this.mercado);
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 4000
    }).then(toast => toast.present());
  }

}
