/* jshint -W117, -W030 */
describe('sdApp.posts', () => {

  describe('routing', () => {

    let views = {
      posts: 'app/sections/posts/list/list.html',
      createPost: 'app/sections/posts/create/create.html'
    };

    let state;
    let rootScope;

    beforeEach(module('sdApp.posts'));

    beforeEach(inject(($location, $rootScope, $state, $templateCache) => {
      $templateCache.put(views.core, '');
      state = $state;
      rootScope = $rootScope;
    }));

    /* Posts page */
    it('should map "/posts" route to posts view template', () => {
      expect(state.get('posts').views[''].templateUrl).to.equal(views.posts);
    });

    it('should make "posts" state require authentication', () => {
      let stateData = state.get('posts').data;
      expect(stateData.navContext).to.include('authenticated');
    });

    /* Create Post page */
    it('should map "/createPost" route to new post view template', () => {
      expect(state.get('createPost').views[''].templateUrl).to.equal(views.createPost);
    });

    it('should make "createPost" state require authentication', () => {
      let stateData = state.get('createPost').data;
      expect(stateData.navContext).to.include('authenticated');
    });

  });

});
