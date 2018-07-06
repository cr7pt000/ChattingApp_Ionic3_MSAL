export class AppSettings {

  public static tenant = "MsalTestGroup.onmicrosoft.com";
  public static clientId = '4d57acc2-3c2d-47eb-a490-c3c8d2f7242d';
  public static signUpSignInPolicy = "b2c_1_logintest";
  public static b2cScopes = [ "https://MsalTestGroup.onmicrosoft.com/MsalTest/rvw.read.only"];
    public static WebApi = [ "https://fabrikamb2chello.azurewebsites.net/hello"];
    public static authorityOnly = "https://login.microsoftonline.com/tfp/"+ AppSettings.tenant + "/";
    public static authority = AppSettings.authorityOnly + AppSettings.signUpSignInPolicy;
    //public static B2C_AD_RedirectUri_MobileDevice = "https://login.microsoftonline.com/tfp/oauth2/nativeclient";
    public static B2C_AD_RedirectUri_MobileDevice = "msal"+AppSettings.clientId+"://auth";
    public static B2C_AD_RedirectUri_Browser = "https://login.microsoftonline.com/tfp/oauth2/nativeclient";
    public static B2C_AD_RedirectUri =  AppSettings.B2C_AD_RedirectUri_Browser;
    //public static B2C_AD_RedirectUri = AppSettings.B2C_AD_RedirectUri_MobileDevice;
}
