import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


// google plus
import { GooglePlus } from '@ionic-native/google-plus/ngx';

// fire auth
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user: Observable<firebase.User>;

  constructor( private gplus: GooglePlus,
               private router: Router,
               public afAuth: AngularFireAuth,
               private platform: Platform) {
    this.user = this.afAuth.authState;
  }

  googleLogin() {
    if ( this.platform.is('cordova') ) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }


  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId' : '67700345279-gt322ut7g5ce63oej8h6t2u75rsbfuj8.apps.googleusercontent.com',
        'offline' : true,
        'scopes' : 'profile email'
      });

      return await this.afAuth
        .signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
        )
        .then(data => {
          this.router.navigate(['home']);
        });
    } catch (err) {
      console.log(err);
    }
  }


  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth
        .signInWithPopup(provider)
        .then(data => {
          this.router.navigate(['home']);
        });
    } catch (err) {
      console.log(err);
    }
  }

  signOut() {
    this.afAuth.signOut();
    if ( this.platform.is('cordova') ) {
      this.gplus.logout();
    }
  }

  capturarUID() {
    this.user.subscribe( us => {
      return us.uid;
    });
  }




}
