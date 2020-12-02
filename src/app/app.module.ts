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

// GOOGLEPLUS
import { GooglePlus } from '@ionic-native/google-plus/ngx';

// Importación FireBase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Storage
import { IonicStorageModule } from '@ionic/storage';

// AGM Core
import { AgmCoreModule } from '@agm/core';

// Geolocalización
import { Geolocation } from '@ionic-native/geolocation/ngx';

//  Compartir en redes sociales
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

// Llamada
import { CallNumber } from '@ionic-native/call-number/ngx';

// Launch Navigator
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

// Image picker
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0chN_F3H7l4M6ByA2GXYQCXT-c_MeQyc'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthServiceService,
    GeolocationServiceService,
    MarketServiceService,
    DataLocalService,
    GooglePlus,
    SocialSharing,
    Geolocation,
    CallNumber,
    LaunchNavigator,
    ImagePicker,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
