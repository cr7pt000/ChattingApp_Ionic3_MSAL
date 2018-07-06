import * as Msal from 'msal';
import { Injectable } from '@angular/core';
import {AppSettings} from  '../app/app.settings';
declare var window: any;
declare var cordova: any;


@Injectable()
export class MsalService{
    public access_token: string;
    public user: string;
    private authority: string;
    private tenantConfig: any;
    private clientApplication: any;

    constructor() {
        this.initAuthApp();

    }
    public loggerCallback(logLevel, message, piiLoggingEnabled) {
        console.log(message);
    }

    protected initAuthApp() {
        var __this=this;
        var logger = new Msal.Logger(this.loggerCallback, { level: Msal.LogLevel.Verbose, correlationId:'12345' }); // level and correlationId are optional parameters.
		//Logger has other optional parameters like piiLoggingEnabled which can be assigned as shown aabove. Please refer to the docs to see the full list and their default values.

        this.tenantConfig = {
            tenant: AppSettings.tenant,
            clientID: AppSettings.clientId,
            signUpSignInPolicy:AppSettings.signUpSignInPolicy,
            b2cScopes: AppSettings.b2cScopes,
            webApi: AppSettings.WebApi,
        };
        this.authority =AppSettings.authority; // "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

        this.clientApplication = new Msal.UserAgentApplication(
            this.tenantConfig.clientID, this.authority,
            function (errorDesc: any, token: any, error: any, tokenType: any) {
                // Called after loginRedirect or acquireTokenPopup
                alert('token:' + token);

                // __this.setLoggedInUserData(token);

                // alert('2:' + token);
            }, { logger: logger, cacheLocation: 'localStorage', redirectUri: 'http://localhost:8080', navigateToLoginRequestUrl: false}
        );
       //this.clientApplication.redirectUri = AppSettings.B2C_AD_RedirectUri;
    }
    // public setLoggedInUserData(token:string):void{

    //     super.setLoggedInUserData(token, this.createUser(token ));
    // }

  get authenticated() {
    return this.token.then(t => !!t);
  }

  get token() {
    return this.getToken();
  }

  public login() {
      return this.tenantConfig.popup ?
      this.loginPopup() :
      this.loginRedirect();
  }

  public getToken(): Promise<string> {
    return this.clientApplication.acquireTokenSilent(this.tenantConfig.b2cScopes)
      .then(token => {
        return token;
      }).catch(error => {
        return this.clientApplication.acquireTokenPopup(this.tenantConfig.b2cScopes)
          .then(token => {
            return Promise.resolve(token);
          }).catch(innererror => {
            return Promise.resolve('');
          });
      });
  }

  public logout() {
    this.clientApplication.logout();
  }

  //public login(): void {
  //  this.initAuthApp();
  //  this.clientApplication.loginRedirect(this.tenantConfig.b2cScopes);
  // }

  public loginPopup() {
    return this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then((idToken) => {
      this.clientApplication.acquireTokenSilent(this.tenantConfig.b2cScopes).then(
        (token: string) => {
          return Promise.resolve(token);
        }, (error: any) => {
          this.clientApplication.acquireTokenPopup(this.tenantConfig.b2cScopes).then(
            (token: string) => {
              return Promise.resolve(token);
            }, (innererror: any) => {
              console.log('Error acquiring the popup:\n' + innererror);
              return Promise.resolve('');
            });
        });
    }, (error: any) => {
      console.log('Error during login:\n' + error);
      return Promise.resolve('');
    });
  }

  private loginRedirect() {
    this.clientApplication.loginRedirect(this.tenantConfig.b2cScopes, '', function(browserRef, storage, param, callback){
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost") === 0) {
          browserRef.removeEventListener("exit", (event) => {});
          browserRef.close();

          var hash = (event.url).split("#")[1];
          var responseParameters = hash.split("&");
          storage.setItem(param, hash);

          window.location.reload();

          console.log(responseParameters);
        }
      });

      browserRef.addEventListener("exit", function(event) {
        console.log("in-app-browser close");
      });
    });
    
    return this.getToken().then(() => {
      Promise.resolve(this.clientApplication.getUser());
    });
  }
  public acquireTokenSilent(): Promise<any> {
    return this.clientApplication.acquireTokenSilent(this.tenantConfig.b2cScopes)
  }

  //public   logout(): void {

  //   this.clientApplication.logout();
  //};

  public isOnline(): boolean {

    return this.clientApplication.getUser() != null;
  };
 }
