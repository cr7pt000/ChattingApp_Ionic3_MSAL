import { Deeplinks } from '@ionic-native/deeplinks';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from './../pages/on-boarding/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavParams , NavController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { MsalService } from '../services/msal.service';
import { AppSettings } from './app.settings';
declare var cordova: any;
@Component({
    templateUrl: 'app.html'
})
export class MyApp{
    @ViewChild(Nav) navChild: Nav;
    rootPage: string = "LoginPage";
    language: string= 'en';
    constructor(private platform: Platform, private msalService: MsalService
        , statusBar: StatusBar, splashScreen: SplashScreen
        , private deeplinks: Deeplinks
        ) {
            this.initializeApp()
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
           // console.log(this.navChild);
            // statusBar.styleDefault();
            // splashScreen.hide();

            if (typeof cordova !== 'undefined') {
                //set the URI scheme
                AppSettings.B2C_AD_RedirectUri = AppSettings.B2C_AD_RedirectUri_MobileDevice;
                console.log(AppSettings.B2C_AD_RedirectUri);

                if (cordova && cordova.InAppBrowser) {
                  //alert(AppSettings.B2C_AD_RedirectUri);
                    window.open = cordova.InAppBrowser.open;
                }
            }
        });


    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navChild.setRoot(page);

    }
}

