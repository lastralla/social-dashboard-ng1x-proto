import angular from 'angular';
import { LoginController } from './routes/login/LoginController.js';
import { RegisterController } from './routes/register/RegisterController.js';

angular
  .module('sdApp.access')
  .run(accessModuleRun);

////////// Functions //////////

/* @ngInject */
function accessModuleRun(routerHelper, ACCESS_ROUTING_CONF) {

  routerHelper.configureStates(getURLMappings());

  ////////// Functions //////////

  function getURLMappings() {
    let conf = ACCESS_ROUTING_CONF;

    return [{
      state: conf.loginState,
      config: getLoginStateConf([
        'public'
      ], conf.loginRoute)
    }, {
      state: 'register',
      config: getRegisterStateConf([
        'public',
        'registration'
      ], conf.registerRoute)
      // Commenting out these routes for demo, write tests when uncommenting
      // }, {
      //   state: 'emailCapture',
      //   config: getEmailCaptureStateConf([
      //     'registration'
      //   ], '/access/provide-email')
      // }, {
      //   state: 'avatarCapture',
      //   config: getAvatarCaptureStateConf([
      //     'registration'
      //   ], '/access/choose-avatar')
      // }, {
      //   state: 'emailValidationPrompt',
      //   config: getEmailValidationPromptStateConf([
      //     'registration'
      //   ], '/access/validate-email')
      // }, {
      //   state: 'emailValidationConfirm',
      //   config: getEmailValidationConfirmStateConf([
      //     'registration'
      //   ], '/access/validated')
    }];

    ////////// Functions //////////

    function getLoginStateConf(navContext, url) {
      return {
        url: url,
        layout: 'access-layout',
        title: 'Login',
        views: {
          '': {
            controller: LoginController,
            controllerAs: 'vm',
            templateUrl: require('./routes/login/login.html')
          }
        },
        data: {
          navContext: navContext
        }
      };
    }

    function getRegisterStateConf(navContext, url) {
      return {
        url: url,
        layout: 'access-layout',
        title: 'Register',
        views: {
          '': {
            controller: RegisterController,
            controllerAs: 'vm',
            templateUrl: require('./routes/register/register.html')
          }
        },
        data: {
          navContext: navContext
        }
      };
    }

    // function getEmailCaptureStateConf(navContext, url) {
    //   return {
    //     url: url,
    //     layout: 'access-layout',
    //     title: 'Provide Email',
    //     views: {
    //       '': {
    //         controller: RegisterController, // temp controller
    //         controllerAs: 'vm',
    //         template: '<div>{{::vm.message}}</div>' +
    //           '<a ui-sref="avatarCapture" class="btn">Next</a>'
    //       }
    //     },
    //     data: {
    //       navContext: navContext,
    //       message: 'Please provide email'
    //     }
    //   };
    // }

    // function getAvatarCaptureStateConf(navContext, url) {
    //   return {
    //     url: url,
    //     layout: 'access-layout',
    //     title: 'Choose Avatar',
    //     views: {
    //       '': {
    //         controller: RegisterController, // temp controller
    //         controllerAs: 'vm',
    //         template: '<div>{{::vm.message}}</div>' +
    //           '<a ui-sref="emailValidationPrompt" class="btn">Next</a>'
    //       }
    //     },
    //     data: {
    //       navContext: navContext,
    //       message: 'Choose Avatar'
    //     }
    //   };
    // }

    // function getEmailValidationPromptStateConf(navContext, url) {
    //   return {
    //     url: url,
    //     layout: 'access-layout',
    //     title: 'Validate your email',
    //     views: {
    //       '': {
    //         controller: RegisterController, // temp controller
    //         controllerAs: 'vm',
    //         template: '<div>{{::vm.message}}</div>' +
    //           '<a ui-sref="emailValidationConfirm" class="btn">Next</a>'
    //       }
    //     },
    //     data: {
    //       navContext: navContext,
    //       message: 'Validate your email. Click link emailed to you.'
    //     }
    //   };
    // }

    // function getEmailValidationConfirmStateConf(navContext, url) {
    //   return {
    //     url: url,
    //     layout: 'access-layout',
    //     title: 'Email Validated',
    //     views: {
    //       '': {
    //         controller: RegisterController, // temp controller
    //         controllerAs: 'vm',
    //         template: '<div>{{::vm.message}}</div>' +
    //           '<a ui-sref="home" class="btn">Home</a>'
    //       }
    //     },
    //     data: {
    //       navContext: navContext,
    //       message: 'Your account has been created'
    //     }
    //   };
    // }

  }

}
