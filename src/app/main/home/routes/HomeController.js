class HomeController {

  /* @ngInject */
  constructor(loggedUser) {
    this.message = 'Welcome to Social Dashboard';
    this.loggedUser = loggedUser.getLoggedUser();
  }

}

export { HomeController };
