let _loggedUser;

class AppMainNavController {

  /* @ngInject */
  constructor(routerHelper, $state, loggedUser) {
    _loggedUser = loggedUser;

    this.state = $state;

    this.currentBrand = loggedUser.getCurrentBrandId();

    this.states = routerHelper
      .getStates()
      .filter((state) => {
        /* Store state name or abstract parent name so main nav can stay highlighted */
        var stateParentName = state.name.split('.')[0];
        state.parentName = stateParentName;

        if (state.data && state.data.topLevelNav && state.data.topLevelNav.order) {
          return state.data.topLevelNav;
        }
      })
      .sort((state1, state2) => {
        return state1.data.topLevelNav.order - state2.data.topLevelNav.order;
      });
  }

  updateBrands() {
    _loggedUser.setCurrentBrandId(this.currentBrand);
  }

}

export { AppMainNavController };
