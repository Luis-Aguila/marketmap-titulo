import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMarketPageRoutingModule } from './agregar-market-routing.module';

import { AgregarMarketPage } from './agregar-market.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMarketPageRoutingModule
  ],
  declarations: [AgregarMarketPage]
})
export class AgregarMarketPageModule {}
