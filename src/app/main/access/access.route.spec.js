/* jshint -W117, -W030 */
describe('sdApp.access', () => {

  describe('routing', () => {

    let views = {
      login: 'app/main/access/login/login.html',
      register: 'app/main/access/register/register.html'
    };

    let state;
    let rootScope;

    beforeEach(module('sdApp.access'));

    beforeEach(inject(($location, $rootScope, $state, $templateCache) => {
      $templateCache.put(views.core, '');
      state = $state;
      rootScope = $rootScope;
    }));

    /* Login page */
    it('should map "/main/access/login" route to login view template', () => {
      expect(state.get('login').views[''].templateUrl).to.equal(views.login);
    });

    it('should make "login" state navContext public', () => {
      let stateData = state.get('login').data;
      expect(stateData.navContext).to.include('public');
    });

    /* Register page */
    it('should map "/main/access/register" route to register view template', () => {
      expect(state.get('register').views[''].templateUrl).to.equal(views.register);
    });

    it('should make "register" state navContext public and registration', () => {
      let stateData = state.get('register').data;
      expect(stateData.navContext).to.include('public');
      expect(stateData.navContext).to.include('registration');
    });
  });

});
