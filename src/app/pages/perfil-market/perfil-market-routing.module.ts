import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilMarketPage } from './perfil-market.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilMarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilMarketPageRoutingModule {}
