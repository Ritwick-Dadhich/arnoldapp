import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AboutPage } from '../pages/about/about';

import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  public fireAuth : any;
  public userProfiles: any;
  public userlog : any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    firebase.initializeApp({


      
        apiKey: "AIzaSyB24bf6gxx36aToQy1YBViLWo6NYj45Lds",
        authDomain: "fireriti.firebaseapp.com",
        databaseURL: "https://fireriti.firebaseio.com",
        projectId: "fireriti",
        storageBucket: "",
        messagingSenderId: "377167119003",
        appId: "1:377167119003:web:55f4553158d7ac63"
    


  });
    this.initializeApp();

    this.fireAuth = firebase.auth();
	
    firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            
            this.userlog = firebase.database().ref('/users').child(user.uid).on('value', snapshot =>{
              if(snapshot.val()){
                  this.userProfiles = snapshot.val();
              }
            
            });
      }
    });
  
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      
      { title: 'About', component: AboutPage },

      { title: 'Logout', component: LogoutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
