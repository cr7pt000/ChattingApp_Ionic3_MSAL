import { BaseAuthPage } from './../../baseauthpage';
import { MsalService } from './../../../services/msal.service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html' 
})
export  class SignOutPage  {

  constructor(public navCtrl: NavController, protected msalService: MsalService) {
 
    this.logout();
  }

    private logout() {
       this.msalService.logout();
    }

}
