import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarMarketPageRoutingModule } from './modificar-market-routing.module';

import { ModificarMarketPage } from './modificar-market.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarMarketPageRoutingModule
  ],
  declarations: [ModificarMarketPage]
})
export class ModificarMarketPageModule {}
