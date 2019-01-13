/* jshint -W117, -W030 */
describe('sdApp.access', () => {

  describe('access service', () => {

    let access;
    let $rootScope;
    let $state;
    let $httpBackend;

    beforeEach(module('sdApp.access'));

    beforeEach(inject((_access_, _$rootScope_, _$state_, _$httpBackend_) => {
      access = _access_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $httpBackend = _$httpBackend_;

      $httpBackend
        .when('GET', 'app/core/404.html')
        .respond('whatever');

      $state.go = sinon.spy();

      $rootScope.$digest();
    }));

    // it('should respond to "access.unauthorized" event', () => {
    //   $rootScope.$emit('access.unauthorized');
    //   expect($state.go.callCount).to.equal(1);
    // });

  });

});
