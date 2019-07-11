import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import firebase from 'firebase';
import {AuthProvider} from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: any; 
  errorRegisterMessage: any;
  zone: NgZone;
  userProfile: any = null;
  public currentUser: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public nav : Nav) {
    this.form = {};
    this.auth = auth;

    this.zone = new NgZone({});
	 
	 
  //   firebase.auth().onAuthStateChanged(user => {
  //  if (user) {
  //  // User is signed in.
   
  //  console.log(user);
  //  this.currentUser = user;
   
  //  console.log("New user" ,this.currentUser);
   
 
  //  //this.homepage.goToCityList();
  //  this.goToHome();		

   
   
  //  } else {
  //  // No user is signed in.
   
  //  console.log("loggedd out none");
  //  }
  // });
}
signup(){
  this.nav.push(SignupPage);
}



login(email,password){

  this.form.email=email;
  this.form.password=password;
  
  console.log("New Login");
  
  
  
  if(this.validate()){
    
  console.log("Validate");
    
      this.auth.login(this.form.email, this.form.password).then((success) =>{
        this.userProfile = success;
       
    console.log(success);
    
    this.nav.setRoot(HomePage);
    
    
   // this.nav.setRoot(CityListPage);

      }).catch(err => {this.handleError(err)});
  
      
    }
    
}

handleError(err){
  console.log(err.code);
  this.errorRegisterMessage = "No User found Please check ur email and password";
 // this.disableLogin = false;
}

validate(){
  console.log("Validate form");
  if(this.form.email == undefined || this.form.email == ''){
  console.log("Validate form error");
    this.errorRegisterMessage = 'Please enter email';
    return false;
  }
  if(this.form.password == undefined || this.form.password == ''){
  console.log("Validate form error2");
    this.errorRegisterMessage = 'Please enter password';
    return false;
  }
  return true;
}

goToHome(){
  this.nav.setRoot(HomePage);
} 

}

