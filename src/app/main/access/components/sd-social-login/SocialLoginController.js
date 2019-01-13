let _$auth;
let _access;

class SocialLoginController {

  /* @ngInject */
  constructor($auth, access) {
    _$auth = $auth;
    _access = access;
  }

  doFacebookLogin() {
    let tokenPromise = _$auth.authenticate('facebook');
    _access.login(tokenPromise);
  }

  doTwitterLogin() {
    console.log('Twitter login to be implemented');
  }
}

export { SocialLoginController };
