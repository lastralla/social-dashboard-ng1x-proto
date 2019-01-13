class CreatePostWorkflowController {

  /* @ngInject */
  constructor() {
    this.masterChannel = null;
    this.uiState = getInitialUIState();
  }

  enableSchedulingStep() {
    this.uiState.steps.schedulingStep.active = true;
  }

  disableSchedulingStep() {
    this.uiState.steps.schedulingStep.active = false;
  }

  enableCreatePostStep() {
    this.uiState.steps.createPostStep.active = true;
  }

  disableCreatePostStep() {
    this.uiState.steps.createPostStep.active = false;
  }

  addSocialMediaChannel(name, formModel) {
    if (!this.masterChannel) {
      /* Set as the master channel if none exists */
      this.masterChannel = formModel;
      this.masterChannel.body = formModel[name + 'Body'];
    } else {
      /* Copy the master channel's data */
      formModel[name + 'Body'].$setViewValue(this.masterChannel.body.$modelValue);
      formModel[name + 'Body'].$render();
    }

    this.uiState.channels[name].postTo = true;
  }

  removeSocialMediaChannel(name, formModel) {
    if (this.masterChannel === formModel) {
      this.masterChannel = null;
    }

    formModel[name + 'Body'].$setViewValue();
    formModel[name + 'Body'].$render();

    this.uiState.channels[name].postTo = false;
  }

}

export { CreatePostWorkflowController };

////////// Functions //////////

function getInitialUIState() {
  let emptyUIState = Object.freeze({
    isPostable: false,
    steps: {
      schedulingStep: {
        active: true
      },
      createPostStep: {
        active: false
      }
    },
    channels: {
      facebook: {
        postTo: false
      },
      twitter: {
        postTo: false
      }
    }
  });

  return emptyUIState;
}
