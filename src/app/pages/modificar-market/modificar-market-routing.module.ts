import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarMarketPage } from './modificar-market.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarMarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarMarketPageRoutingModule {}
