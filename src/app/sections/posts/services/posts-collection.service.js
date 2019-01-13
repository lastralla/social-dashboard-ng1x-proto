import angular from 'angular';

angular
  .module('sdApp.posts')
  .factory('postsCollection', postsCollection);

////////// Functions //////////

/* @ngInject */
function postsCollection(localStorageService) {
  // function postsCollection(localStorageService, messaging) {

  let service = {
    updatePostsCollection: updatePostsCollection,
    sortPostsByLastUpdate: sortPostsByLastUpdate
  };

  return service;

  ////////// Functions //////////

  function updatePostsCollection(postsArr) {
    if (!localStorageService.get('posts')) {
      localStorageService.set('posts', []);
    }

    let posts = localStorageService.get('posts');
    console.log(postsArr, localStorageService);

    postsArr.forEach((post) => {
      if (posts.length > 0) {
        /* Check if the post already in the store */
        let postExists = posts.some((item) => {
          return (item.postId === post.postId);
        });

        if (!postExists) {
          addPostToStore(post);
        }
      } else {
        addPostToStore(post);
      }
    });

    localStorageService.set('posts', posts);

    return localStorageService.get('posts');

    ////////// Functions //////////

    function addPostToStore(post) {
      /* Separate out post messages */
      // messaging.addPostMessagesToCollection(post);

      posts.push(post);
    }

  }

  function sortPostsByLastUpdate(postsArr) {
    postsArr.sort((p1, p2) => {
      return p1.lastUpdate <= p2.lastUpdate;
    });

    return postsArr;
  }

}
