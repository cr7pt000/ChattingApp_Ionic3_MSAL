import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MsalService } from '../../../services/msal.service';
import { AppSettings } from './../../../app/app.settings';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  constructor(public navCtrl: NavController, public msalService: MsalService
  ) {
  }

  login() {
    this.msalService.login();
  }
  ionViewWillEnter()
  {

    AppSettings.signUpSignInPolicy = AppSettings.signUpSignInPolicy;//idpSelectionSignInPolicy;
    AppSettings.authority = AppSettings.authorityOnly + AppSettings.signUpSignInPolicy;
    //AppSettings.authority = "https://login.microsoftonline.com/tfp/MsalTestGroup.onmicrosoft.com/b2c_1_logintest"
    console.log('auf', AppSettings.authority)
    // case 1 - user  is new
    // check for the  existing user by object id - if exists  - then take them to dashboard s

    //if (!this.msalService.isOnline()) {
    //  this.msalService.login();
    //}else{
     // this.navCtrl.push("MyProfilePage");
    //}

  }

}

