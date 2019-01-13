let _$auth;
let _access;

class RegisterFormController {

  /* @ngInject */
  constructor($auth, access) {
    _$auth = $auth;
    _access = access;

    this.error = access.error; // TODO replace this error logic with popupMessage
  }

  doRegister(form) {
    this.registerAttempted = true;  // TODO Flag for error display purposes (this needs work)

    if (form.$invalid) {
      return;
    }

    let user = {
      firstName: form.firstName.$viewValue,
      lastName: form.lastName.$viewValue,
      email: form.email.$viewValue,
      password: form.password.$viewValue
    };

    let tokenPromise = _$auth.signup(user);
    _access.register(tokenPromise);

    // TODO review how error message is handled within the service.
    // authentication errors not being push to the UI, need to catch the token promise here
  }

}

export { RegisterFormController };
