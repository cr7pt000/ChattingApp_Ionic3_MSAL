# Ionic3_MSAL

How to use modified MSAL for Ionic3 app development

- Run command "npm install"
	This will download all required frameworks in ./node_modules.

- Replace ./node_modules/msal with ./msal
	More precisely, replace file located at "./msal/lib-commonjs/UserAgentApplication.js"

- Run command "ionic cordova build ios"