import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Mercado } from '../../interfaces/mercado.interface';
import { MarketServiceService } from '../../services/market-service.service';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';


// imagen
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

// importa alert
import { AlertController } from '@ionic/angular';

// picker
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-modificar-market',
  templateUrl: './modificar-market.page.html',
  styleUrls: ['./modificar-market.page.scss'],
})
export class ModificarMarketPage implements OnInit {

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
  profileUrl: Observable<string | null>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  cambioGaleria: number;
  seleccionarCambioGaleria = false;
  portadapiker: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private marketService: MarketServiceService,
              private toastCtrl: ToastController,
              private router: Router,
              public authservice: AuthServiceService,
              private storage: AngularFireStorage,
              public alertController: AlertController,
              public imagePicker: ImagePicker,
              public file: File ) {
    // this.mercado.propietario = this.authservice.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
    this.mensajePerfilMercado();
  }

  accionCambioGaleria(pos: number) {
    this.cambioGaleria = pos;
    if (this.seleccionarCambioGaleria) {
      this.seleccionarCambioGaleria = false;
    } else {
      this.seleccionarCambioGaleria = true;
    }
  }

  capturarPortada() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 100,
      height: 100
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        let filename = results[i].substring(results[i].lastIndexOf('/') + 1);
        let path = results[i].substring(0, results[i].lastIndexOf('/') + 1);
        this.file.readAsDataURL(path, filename).then((base64string) => {
          this.portadapiker.push(base64string);
        });
      }
    });
  }

  actualizarPortada(event) {
    const file = event.target.files[0];
    if ( file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' ) {
      const filePath = 'portada/' + this.mercado.id;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(result => {
          this.mercado.portada = result;
          this.cambiarPortada();
          // this.seleccionarCambio = false;
        }))
      ).subscribe();
    } else {
      this.showToast('Imágen no soportada!!');
    }
  }

  actualizarGaleria(event) {
    const file = event.target.files[0];
    if ( file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' ) {
      const filePath = 'galeria/' + this.mercado.id + this.cambioGaleria;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(result => {
          this.mercado.galeria[this.cambioGaleria] = result;
          this.cambiarGaleria();
          this.seleccionarCambioGaleria = false;
        }))
      ).subscribe();
    } else {
      this.showToast('Imágen no soportada!!');
    }
  }

  cambiarGaleria() {
    this.marketService.modificarGaleria(this.mercado).then(() => {
      this.showToast('Galeria de fotos a sido Actualizada.');
    }, err => {
      this.showToast('A sucedido un problema al actualizar su galeria.');
    });
  }

  cambiarPortada() {
    this.marketService.modificarPortada(this.mercado).then(() => {
      this.showToast('Portada a sido Actualizada.');
    }, err => {
      this.showToast('A sucedido un problema al modificar su portada.');
    });
  }

  cambiarEstado(estado: boolean) {
    this.mercado.estado = estado;
    this.marketService.modificarEstado(this.mercado).then(() => {
      if (estado) {
        this.showToast('Su Negocio esta abierto');
      } else {
        this.showToast('Su negocio a sido cerrado');
      }
    }, err => {
      this.showToast('A sucedido un problema al modificar el mercado.');
    });
  }

  agregarUbicacionMarket(evento) {
    const coords = evento.coords;
    this.mercado.latitud = coords.lat;
    this.mercado.longitud = coords.lng;
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.marketService.getMarket(id).subscribe(market => {
        this.mercado = market;
      });
    }
  }

  async mensajePerfilMercado() {
    const alert = await this.alertController.create({
      header: 'Sugerencia',
      message: 'Presiona las imágenes para personalizarlas y/o cambiarlas!',
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    await alert.present();
  }

  modificarMercado() {
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
      case 'Pyme':
        this.mercado.icon = '../../../assets/marker/m_carniceria.ico';
        break;
    }
    this.marketService.modificarMercado(this.mercado).then(() => {
      this.router.navigateByUrl('/perfil-user');
      this.showToast('Datos modificados exitosamente');
    }, err => {
      this.showToast('A sucedido un problema al modificar el mercado.');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }

}
