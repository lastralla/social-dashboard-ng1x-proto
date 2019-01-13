let _$auth;
let _access;

class LoginFormController {

  /* @ngInject */
  constructor($auth, access) {
    _$auth = $auth;
    _access = access;

    this.loginAttempted = false;        // TODO flag for error display (this needs work)
    this.error = access.error;   // TODO replace this error logic with popupMessage
  }

  doFormLogin(form) {
    this.loginAttempted = true;   // TODO flag for error display (this needs work)

    if (form.$invalid) {
      return;
    }

    let user = {
      email: form.email.$viewValue,
      password: form.password.$viewValue,
      rememberMe: form.rememberMe.$viewValue
    };

    let tokenPromise = _$auth.login(user);
    _access.login(tokenPromise);

    // TODO review how error message is handled within the service.
    // authentication errors not being push to the UI, need to catch the token promise here
  }

  // TODO clear the password field on error
  // review logic in access

}

export { LoginFormController };
