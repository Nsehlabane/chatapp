import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyATCrSpPM9mGMZUpkC36ubpUgFkhLpGbKs",
  authDomain: "neo-sehlabane.firebaseapp.com",
  databaseURL: "https://neo-sehlabane.firebaseio.com",
  projectId: "neo-sehlabane",
  storageBucket: "neo-sehlabane.appspot.com",
  messagingSenderId: "938693296727"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        this.rootPage='LoginPage'
        unsubscribe();
      }else{
        this.rootPage= 'ChatroomsPage'
        unsubscribe();
      }
    })
  }
}

