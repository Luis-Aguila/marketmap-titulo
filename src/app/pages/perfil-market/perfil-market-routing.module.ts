import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilMarketPage } from './perfil-market.page';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Mapa
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: PerfilMarketPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0chN_F3H7l4M6ByA2GXYQCXT-c_MeQyc'
    }),
  ],
  exports: [RouterModule],
})
export class PerfilMarketPageRoutingModule {}
