import angular from 'angular';

angular
  .module('sdApp.posts')
  .factory('posts', posts);

////////// Functions //////////

/* @ngInject */
function posts($http, API_PATH, CORE_IMAGES_FOLDER_PATH,
    POSTS_PREVIEW_IMAGE, POSTS_BLANK_POST) {

  let service = {
    getPosts: getPosts,
    addPost: addPost,
    getBlankPost: getBlankPost,
    resolvePostPreviewImage: resolvePostPreviewImage,
    tagPostWithChannels: tagPostWithChannels
  };

  return service;

  ////////// Functions //////////

  function getPosts() {
    return $http.get(API_PATH + 'posts/list/');
  }

  function addPost(postObj) {
    return $http.post(API_PATH + 'posts/add/', postObj);
  }

  function getBlankPost() {
    return POSTS_BLANK_POST;
  }

  function resolvePostPreviewImage(post) {
    let postDefaultImage = CORE_IMAGES_FOLDER_PATH + POSTS_PREVIEW_IMAGE;
    let src = post.content.previewImage || postDefaultImage;

    return src;
  }

  /**
   * Adds a boolean flag for each channel that the post contains.
   */
  function tagPostWithChannels(post) {
    let appliedChannels = {};
    let channelsObj = post.content.channels;

    if (channelsObj.facebook) {
      appliedChannels.facebook = true;
    }
    if (channelsObj.twitter) {
      appliedChannels.twitter = true;
    }

    return appliedChannels;
  }
}
