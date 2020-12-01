import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilMarketPageRoutingModule } from './perfil-market-routing.module';

import { PerfilMarketPage } from './perfil-market.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilMarketPageRoutingModule
  ],
  declarations: [PerfilMarketPage]
})
export class PerfilMarketPageModule {}
