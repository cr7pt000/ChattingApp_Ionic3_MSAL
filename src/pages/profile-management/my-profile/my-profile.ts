
import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MsalService } from '../../../services/msal.service';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
// export class MemberProfile {
  

//   public UseTouchId: boolean = null;
 
// }


export class MyProfilePage {
  //public userProfile: MemberProfile;
  constructor(private platform: Platform,  public navCtrl: NavController, public navParams: NavParams, public msalService:MsalService) {

  }

  loadUserProfile()
  {
    //this.userProfile={UseTouchId:false}

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
//   public setFingerPrint()
//   {
//     debugger;
//     console.log(this.userProfile.UseTouchId);
//     if(this.userProfile.UseTouchId)
//     {
//       this.showfingerprintDialog();
//     }
//   }
//  async  showfingerprintDialog()
//   {
//     try{
//       await this.platform.ready();
//       const available = await this.fingerprint.isAvailable()
//       if(available)
//     }
//    catch{
//      console.error();
//    }

//   }
}
