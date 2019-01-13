import angular from 'angular';

angular
  .module('sdApp.posts')
  .constant('POSTS_PREVIEW_IMAGE', 'placeholder-post-preview.png')
  .constant('POSTS_TYPES', Object.freeze([{
      name: 'Text',
      value: 'text'
    }, {
      name: 'Link',
      value: 'link'
    }, {
      name: 'Image',
      value: 'image'
    }, {
      name: 'Video',
      value: 'video'
    }
  ]))
  .constant('POSTS_BLANK_POST', Object.freeze({
    postType: null,   // enum: text|link|image|video
    status: null,     // enum: draft|scheduled|posted
    scheduleTime: '',
    keywords: [],
    content: {
      previewImage: '',
      media: '',
      channels: {
        facebook: {
          body: ''
        },
        twitter: {
          body: ''
        }
      }
    }
  }));
