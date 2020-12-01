import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMarketPage } from './agregar-market.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMarketPageRoutingModule {}
