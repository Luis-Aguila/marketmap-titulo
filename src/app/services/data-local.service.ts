import { Injectable } from '@angular/core';

// Importaciones
import { Storage } from '@ionic/storage';
import { Mercado } from '../interfaces/mercado.interface';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  markets: Mercado[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
  }

  guardarMercado( mercado: Mercado) {
    const existe = this.markets.find(mark => mark.latitud === mercado.latitud && mark.longitud === mercado.longitud);
    if ( !existe ) {
      this.markets.unshift(mercado);
      this.storage.set('Favoritos', this.markets);
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('Favoritos');
    if ( favoritos ) {
      this.markets = favoritos;
    }
  }

  borrarFavorito(favorito: Mercado) {
    this.markets = this.markets.filter(mark => mark.id !== favorito.id);
    this.storage.set('Favoritos', this.markets);
  }


}
