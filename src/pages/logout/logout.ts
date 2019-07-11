import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  public fireAuth : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app : App) {
    this.fireAuth = firebase.auth();
    console.log('logged out');
      this.app.getRootNavs()[0].setRoot(LoginPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
