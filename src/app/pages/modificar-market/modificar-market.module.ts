import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarMarketPageRoutingModule } from './modificar-market-routing.module';

import { ModificarMarketPage } from './modificar-market.page';

// Mapa
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarMarketPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0chN_F3H7l4M6ByA2GXYQCXT-c_MeQyc'
    })
  ],
  declarations: [ModificarMarketPage]
})
export class ModificarMarketPageModule {}
