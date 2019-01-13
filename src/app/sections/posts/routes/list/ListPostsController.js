class ListPostsController {

  /* @ngInject */
  constructor(posts, postsCollection) {

    posts.getPosts().then((response) => {
      let posts = postsCollection.updatePostsCollection(response.data);

      posts.forEach((post) => {
        modifyPostData(post);
      });

      this.posts = postsCollection.sortPostsByLastUpdate(posts);
    });

    ////////// Functions //////////

    function modifyPostData(post) {
      /* Fill in a preview image if there is none */
      post.content.previewImage = posts.resolvePostPreviewImage(post);

      /* Add flag for applied channel */
      post.appliedChannels = posts.tagPostWithChannels(post);
    }
  }

}

export { ListPostsController };
