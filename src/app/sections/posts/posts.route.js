import angular from 'angular';
import { ListPostsController } from './routes/list/ListPostsController.js';
import { CreatePostController } from './routes/create/CreatePostController.js';

angular
  .module('sdApp.posts')
  .run(postsModuleRun);

////////// Functions //////////

/* @ngInject */
function postsModuleRun(routerHelper) {

  routerHelper.configureStates(getURLMappings());

  ////////// Functions //////////

  function getURLMappings() {

    return [{
      state: 'posts',
      config: {
        url: '/posts',
        layout: 'app-layout',
        views: {
          '': {
            controller: ListPostsController,
            controllerAs: 'vm',
            templateUrl: require('./routes/list/listPosts.html')
          }
        },
        title: 'Posts',
        data: {
          navContext: [
            'authenticated'
          ],
          topLevelNav: {
            order: 2,
            label: 'posts'
          }
        }
      }
    }, {
      state: 'createPost',
      config: {
        url: '/posts/create',
        layout: 'app-layout',
        views: {
          '': {
            controller: CreatePostController,
            controllerAs: 'vm',
            templateUrl: require('./routes/create/createPost.html')
          }
        },
        title: 'Create a new posts',
        data: {
          navContext: [
            'authenticated'
          ]
        }
      }
    }];

  }

}
