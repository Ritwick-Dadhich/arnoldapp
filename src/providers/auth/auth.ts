import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';



@Injectable()
export class AuthProvider {

  email: any;
  password: any;
  public fireAuth : any;
  public users: any;

  constructor(public http: HttpClient) {

    this.fireAuth = firebase.auth(); 
    this.users = firebase.database().ref('/users');
  }

  login(email: String, password: String){
  	return this.fireAuth.signInWithEmailAndPassword(email,password);
  }
  
  register(email:String, password:String,address: String){
  
  	return this.fireAuth.createUserWithEmailAndPassword(email, password)
  	.then((newUser) =>{
  		this.users.child(newUser.uid).set({
        email: email,
		    address:address,
        
    
        });
  	});


  }
  logoutUser(): any{
    return this.fireAuth.signOut();
  }

}
