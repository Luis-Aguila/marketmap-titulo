import { Injectable } from '@angular/core';


// Importación de modulos de firebase
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


// Exportación de la interfaz mercado
import { Mercado } from '../interfaces/mercado.interface';


@Injectable({
  providedIn: 'root'
})
export class MarketServiceService {

  private markets: Observable<Mercado[]>;
  private propiosMarkets: Observable<Mercado[]>;
  private marketCollection: AngularFirestoreCollection<Mercado>;
  public param: any;

  constructor(private afs: AngularFirestore) {
    this.marketCollection = this.afs.collection<Mercado>('market');
  }

  getMarkets(): Observable<Mercado[]> {
    this.markets = this.marketCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.markets;
  }

  getMarket(id: string): Observable<Mercado> {
    return this.marketCollection.doc<Mercado>(id).valueChanges().pipe(
      take(1),
      map(market => {
        market.id = id;
        return market;
      })
    );
  }

  getConsultaTipo(parametro: number): Observable<Mercado[]> {
    switch (parametro) {
      case 0:
        this.param = 'Pyme';
        break;
      case 1:
        this.param = 'Mercado';
        break;
      case 2:
        this.param = 'Farmacia';
        break;
      case 3:
        this.param = 'Supermercado';
        break;
      case 4:
        this.param = 'Fruteria';
        break;
      case 5:
        this.param = 'Carniceria';
        break;
      case 6:
        this.param = 'Ferreteria';
        break;
      case 7:
        this.param = 'Licoreria';
        break;
      case 8:
        this.param = 'Restaurant';
        break;
    }
    // this.afs.collection<Mercado>('market', ref => ref.where('tipo', '==', this.param));
    this.markets = this.afs.collection<Mercado>('market', ref => ref.where('tipo', '==', this.param)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.markets;
  }

  buscarMercado( mer: string): Observable<Mercado[]> {
    let mercado = mer.toUpperCase();
    this.markets = this.afs.collection<Mercado>('market', ref => ref.where('nombre', '==', mercado)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.markets;
  }

  guardarMercado( mercado: Mercado): Promise<DocumentReference> {
    return this.marketCollection.add(mercado);
  }

  cargarPropios(propietario: string): Observable<Mercado[]> {
    this.propiosMarkets = this.afs.collection<Mercado>('market', ref => ref.where('propietario', '==', propietario)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.propiosMarkets;
  }

  eliminarMercado(id: string): Promise<void> {
    return this.marketCollection.doc(id).delete();
  }

  modificarMercado(mercado: Mercado): Promise<void> {
    return this.marketCollection.doc(mercado.id).update({
      nombre: mercado.nombre.toUpperCase(),
      tipo: mercado.tipo,
      detalle: mercado.detalle,
      ofertas: mercado.ofertas,
      latitud: mercado.latitud,
      longitud: mercado.longitud,
      propietario: mercado.propietario,
      atencion: mercado.atencion,
      direccion: mercado.direccion,
      icon: mercado.icon,
      contacto: mercado.contacto
    });
  }

  modificarEstado(mercado: Mercado): Promise<void> {
    return this.marketCollection.doc(mercado.id).update({
      estado: mercado.estado
    });
  }

  modificarPortada(mercado: Mercado): Promise<void> {
    return this.marketCollection.doc(mercado.id).update({
      portada: mercado.portada
    });
  }

  modificarGaleria(mercado: Mercado): Promise<void> {
    return this.marketCollection.doc(mercado.id).update({
      galeria: mercado.galeria
    });
  }
}
