import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilMarketPageRoutingModule } from './perfil-market-routing.module';

import { PerfilMarketPage } from './perfil-market.page';

// Mapa
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilMarketPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0chN_F3H7l4M6ByA2GXYQCXT-c_MeQyc'
    })
  ],
  declarations: [PerfilMarketPage]
})
export class PerfilMarketPageModule {}
