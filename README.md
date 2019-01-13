Note: This is an old prototype.

# Social Dashboard Prototype


### Logging In

- Registration has been stubbed out for a fake account.
- Log in with email john@doeinc.com (case sensitive), and password: DoeInc
- NOTE: there is no error message shown if you input wrong email or password. If nothing happens try again.
- Login via Facebook is partially done but it's using a fake account. (Do not to used during a demo since there will be no real facebook interaction)


### Building Frontend Code

1. To generate a build for deployment, at a command prompt run `webpack --config webpack.prod.config.js`
2. This generates the web application in the `build` folder (/frontend/build)
3. Run the server, `NODE_ENV=production node server/app.js`. (This lets you test the application as it would appear on the demo server)
4. To specify a different host and port, `NODE_ENV=production PORT=8080 HOST=159.203.187.249 nodejs server/app.js`.
5. Anytime you change code (JS, CSS, HTML) that you want to push to the demo server you must rebuild the project. Repeat step 1.

**Note: The application was developped with Node version v4.2.6 and npm version 2.14.12. Remote server should have these installed.**


------------------------------

## Start Developing


```
npm start
```

This runs the code in development mode at `http://localhost:9000/` and sets up watchers that rebuild the code every time the code changes. (explore *webpack.dev.config.js* file)

------------------------------

## Navigating Mock Data

**Sign In**

- Sign in with the email: john@doeinc.com (case sensitive), and password: DoeInc
- To test authentication error use `error@gmail.com`

**Register**

To test registration feature:

- Register with any email other than `existing@gmail.com`
- To test existing account error use `existing@gmail.com`

