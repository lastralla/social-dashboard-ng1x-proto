import angular from 'angular';
import { CreatePostWorkflowController } from './CreatePostWorkflowController.js';

require('./sd-create-post-workflow.scss');

angular
  .module('sdApp.posts')
  .directive('sdCreatePostWorkflow', sdCreatePostWorkflow);

////////// Functions //////////

/**
 * Manages the UI interaction when creating a post
 */
/* @ngInject */
function sdCreatePostWorkflow() {

  // Usage:
  // <sd-login-form></sd-login-form>
  let ddo = {
    restrict: 'E',
    bindToController: {
      post: '='
    },
    controller: CreatePostWorkflowController,
    controllerAs: 'wf',
    templateUrl: require('./sd-create-post-workflow.html')
  };

  return ddo;

}
