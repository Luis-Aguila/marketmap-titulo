import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMarketPageRoutingModule } from './agregar-market-routing.module';

import { AgregarMarketPage } from './agregar-market.page';

// Mapa
import { AgmCoreModule } from '@agm/core';

// Componentes
import { ComponentsModule } from '../../components/components.module';


// Servicios
import { GeolocationServiceService } from '../../services/geolocation-service.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMarketPageRoutingModule,
    ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0chN_F3H7l4M6ByA2GXYQCXT-c_MeQyc'
    })
  ],
  providers: [
    GeolocationServiceService
  ],
  declarations: [AgregarMarketPage]
})
export class AgregarMarketPageModule {}
