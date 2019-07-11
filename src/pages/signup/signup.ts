import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import firebase from 'firebase';
import {AuthProvider} from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  zone: NgZone;
	  form: any; 
    userProfile: any = null;
  errorRegisterMessage: string;
  currentUser: any;
    //auth :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public nav :Nav) {
    this.form = {};
    this.auth = auth;
    this.zone = new NgZone({});
  }


  register() {
    if(this.validateRegister()){
      //this.disableRegister = true;
      //this.buttonText = "Registering...";
      
      this.form.address = this.form.password;
      this.auth.register(this.form.email, this.form.password, this.form.address).then(() => {
        this.currentUser = firebase.auth().currentUser;
      
		
		console.log(this.currentUser);

   
          
    }).catch(err => {this.handleRegisterError(err)});
		this.nav.setRoot(LoginPage);
	
  }
}
	handleRegisterError(err){
    console.log(err.code);
    this.errorRegisterMessage = err.message;
    
  }
  validateRegister(){
   
    if(this.form.email == undefined || this.form.email == ''){
      this.errorRegisterMessage = 'Please enter email';
      return false;
    }
    if(this.form.password == undefined || this.form.password == ''){
      this.errorRegisterMessage = 'Please enter password';
      return false;
		}
		

    return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
