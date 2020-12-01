import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

// Routes
import { Routes, RouterModule } from '@angular/router';

// Servicios
import { AuthServiceService } from '../../services/auth-service.service';
import { GeolocationServiceService } from '../../services/geolocation-service.service';
import { MarketServiceService } from '../../services/market-service.service';

// Componentes
import { ComponentsModule } from '../../components/components.module';



const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  providers: [
    AuthServiceService,
    GeolocationServiceService,
    MarketServiceService
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
