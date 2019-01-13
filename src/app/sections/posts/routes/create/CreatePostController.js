import angular from 'angular';

let _posts;
let _postsCollection;

class CreatePostController {

  /* @ngInject */
  constructor($state, posts, postsCollection, POSTS_TYPES) {
    _posts = posts;
    _postsCollection = postsCollection;

    this.postTypes = POSTS_TYPES;
    this.keywordsString = '';
    this.post = angular.copy(posts.getBlankPost()); // TODO remove need for this dependency
  }

  splitKeywords() {
    if (this.keywordsString === '') {
      this.post.keywords = [];
    } else {
      let keywords = this.keywordsString.split(',');
      let trimmedKeywords = [];

      keywords.forEach((word) => {
        trimmedKeywords.push(word.trim());
      });

      this.post.keywords = trimmedKeywords;
    }
  }

  submitPost() {
    this.posts.addPost(this.post)
      .then((response) => {
        let postArr = [response.data];

        _postsCollection.updatePostsCollection(postArr);
        this.reset();

        this.$state.go('posts');
      });
  }

  reset() {
    this.post = this.posts.getBlankPost();
    this.keywordsString = '';
  }

}

export { CreatePostController };
