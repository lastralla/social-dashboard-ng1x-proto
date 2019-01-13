/* jshint -W117, -W030 */
describe('sdApp.brands', () => {

  describe('routing', () => {

    let views = {
      brands: 'app/sections/brands/brands.html'
    };

    let state;
    let rootScope;

    beforeEach(module('sdApp.brands'));

    beforeEach(inject(($location, $rootScope, $state, $templateCache) => {
      $templateCache.put(views.core, '');
      state = $state;
      rootScope = $rootScope;
    }));

    it('should map "/brands" route to brands view template', () => {
      expect(state.get('brands').views[''].templateUrl).to.equal(views.brands);
    });

    it('should make "brands" state require authentication', () => {
      let stateData = state.get('brands').data;
      expect(stateData.navContext).to.include('authenticated');
    });

  });

});
