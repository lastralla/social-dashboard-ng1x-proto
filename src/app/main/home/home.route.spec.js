/* jshint -W117, -W030 */
describe('sdApp.home', () => {

  describe('routing', () => {

    // flag1
    let views = {
      home: 'app/main/home/home2.html'
    };

    let state;
    let rootScope;

    beforeEach(module('sdApp.home'));

    beforeEach(inject(($location, $rootScope, $state, $templateCache) => {
      $templateCache.put(views.core, '');
      state = $state;
      rootScope = $rootScope;
    }));

    it('should map "/" route to home view template', () => {
      expect(state.get('home').views[''].templateUrl).to.equal(views.home);
    });

    it('should make "home" state require authentication', () => {
      let stateData = state.get('home').data;
      expect(stateData.navContext).to.include('authenticated');
    });

  });

});
