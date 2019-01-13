/* jshint -W117, -W030 */
describe('sdApp.core', () => {

  describe('routing', () => {

    let views = {
      four0four: 'app/common/core/404.html',
      error: 'app/common/core/error.html'
    };

    let state;
    let rootScope;

    beforeEach(module('sdApp.core'));

    beforeEach(inject(($location, $rootScope, $state, $templateCache) => {
      $templateCache.put(views.core, '');
      state = $state;
      rootScope = $rootScope;
    }));

    // Tests written using bardsjs
    // beforeEach(() => {
    //   module('sdApp.core', bard.fakeToastr);
    //   bard.inject('$location', '$rootScope', '$state', '$templateCache');
    //   $templateCache.put(views.core, '');
    // });

    /* 404 Page */
    it('should map "/404" route to 404 view template', () => {
      expect(state.get('404').templateUrl).to.equal(views.four0four);
    });

    it('should make "404" state available to all users', () => {
      let stateData = state.get('404').data;
      expect(stateData.navContext).to.include('any');
    });

    /* Error page */
    it('should map "/error" route to error view template', () => {
      expect(state.get('error').templateUrl).to.equal(views.error);
    });

    it('should make "error" state available to all users', () => {
      let stateData = state.get('error').data;
      expect(stateData.navContext).to.include('any');
    });

    // TODO why does $rootScope.$apply break? -- seems to be related to ui.router and how promises are mocked
    // it('of 404 should work with $state.go', () => {
    //   state.go('404');
    //   rootScope.$apply(); // TODO why does this fail?
    //   expect(state.is('404'));
    // });

    // TODO why does $rootScope.$apply break?
    // it('should route /invalid to the otherwise (404) route', () => {
    //   $location.path('/invalid');
    //   // $rootScope.$apply();
    //   expect($state.current.templateUrl).to.equal(JSON.stringify($state.current));
    //   // expect($state.current.templateUrl).to.equal(views.four0four);
    // });

  });

});
