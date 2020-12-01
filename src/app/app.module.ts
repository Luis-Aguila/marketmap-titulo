import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { ComponentsModule } from './components/components.module';

// Servicios
import { AuthServiceService } from './services/auth-service.service';
import { GeolocationServiceService } from './services/geolocation-service.service';
import { MarketServiceService } from './services/market-service.service';
import { DataLocalService } from './services/data-local.service';

// Google plus
import { GooglePlus } from '@ionic-native/google-plus/ngx';

// Importación FireBase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthServiceService,
    GeolocationServiceService,
    MarketServiceService,
    DataLocalService,
    GooglePlus
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
