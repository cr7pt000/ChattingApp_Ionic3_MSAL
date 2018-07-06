# Ionic3_MSAL

1. How to use modified MSAL for Ionic3 app development

- Run command "npm install"
	This will download all required frameworks in ./node_modules.
  You'll be able to see msal v0.15 downloaded as default.
  
- Replace ./node_modules/msal with ./msal
	More precisely, replace file located at "./msal/lib-commonjs/UserAgentApplication.js"

- Run command "ionic cordova build ios"

2. What did we change for Ionic usage?
- Changes to library
  !! Note that we modified only 1 file in the library which is located at msal/lib-commonjs/UserAgentApplication.js. Following modifications are all applied to this file.

  'Changes to loginRedirect() function
    Add a parameter for a callback to handle token response
      original: UserAgentApplication.prototype.loginRedirect = function (scopes, extraQueryParameters)
      modified: UserAgentApplication.prototype.loginRedirect = function (scopes, extraQueryParameters, callback)
    
    Change promptUser() function call at the end of the function as following
      original: _this.promptUser(urlNavigate);
      modified: _this.promptUser(urlNavigate, callback);
    
  'Changes to promptUser() function
    Add a parameter for a callback to handle token response
        original: UserAgentApplication.prototype.promptUser = function (urlNavigate)
        modified: UserAgentApplication.prototype.promptUser = function (urlNavigate, callback)
      
    Instead of replacing window location, we open an in-app-browser and pass that browserRef as a parameter of callback function call
      original: window.location.replace(urlNavigate);
      modified: var browserRef = window.open(urlNavigate, "_blank");
                callback(browserRef);
              
- Changes to msal.service.ts
  'In initAuthApp() function, there's a function call for creating UserApplication object.
      this.clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, 
        this.authority,
        function (errorDesc: any, token: any, error: any, tokenType: any) {...},
        {logger: logger, cacheLocation: 'localStorage'});
    We need to change last parameter as following.
    original: {logger: logger, cacheLocation: 'localStorage'}
    modified: {logger: logger, cacheLocation: 'localStorage', redirectUri: 'http://localhost:8080', navigateToLoginRequestUrl: false}
  
  'In loginRedirect() function, there's a function call of clientApplication.loginRedirect().
    We need to change that function call as following.
    
    original: this.clientApplication.loginRedirect(this.tenantConfig.b2cScopes);
    modified: this.clientApplication.loginRedirect(this.tenantConfig.b2cScopes, '', function(browserRef, storage, param, callback){
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
     
     In this function call, 3rd parameter is the callback function that we made changes to MSAL as above.
     The callback functions stands for capturing loadstart event of in-app-browser and taking token from response.
    
     
     
     
     
     
      
