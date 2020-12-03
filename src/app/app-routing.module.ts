import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'agregar-market',
    loadChildren: () => import('./pages/agregar-market/agregar-market.module').then( m => m.AgregarMarketPageModule)
  },
  {
    path: 'perfil-user/:id',
    loadChildren: () => import('./pages/modificar-market/modificar-market.module').then( m => m.ModificarMarketPageModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/perfil-market/perfil-market.module').then( m => m.PerfilMarketPageModule)
  },
  {
    path: 'perfil-user',
    loadChildren: () => import('./pages/perfil-user/perfil-user.module').then( m => m.PerfilUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
