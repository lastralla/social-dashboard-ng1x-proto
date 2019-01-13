class ActiveBrandSelectorController {

  /* @ngInject */
  constructor(loggedUser) {
    let currentUser = loggedUser.getLoggedUser();

    if (!currentUser) {
      return;
    }

    let activeBrand = currentUser.activeBrand;

    this.thumbnail = activeBrand.thumbnail;

    // TODO read of all brands user has access to
    this.brands = [
      activeBrand.name
    ];
    this.activeBrand = activeBrand.name;
  }
}

export { ActiveBrandSelectorController };
