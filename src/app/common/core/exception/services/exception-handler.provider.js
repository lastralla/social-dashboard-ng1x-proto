import angular from 'angular';

angular
  .module('sdApp.core.exception')
  .provider('exceptionHandler', exceptionHandlerProvider)
  .config(configExceptionHandler);

////////// Functions //////////

/**
 * Configures the exception handling
 */
function exceptionHandlerProvider() {
  /* jshint validthis:true */
  let parent = this;

  this.config = {
    appErrorPrefix: undefined
  };

  this.configure = (appErrorPrefix) => {
    this.config.appErrorPrefix = appErrorPrefix;
  };

  this.$get = () => {
    return {
      config: parent.config
    };
  };
}

/**
 * Configure by setting an optional string value for appErrorPrefix.
 * Accessible via config.appErrorPrefix (via config value).
 *
 */
/* @ngInject */
function configExceptionHandler($provide) {
  $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

/**
 * Extend the $exceptionHandler service to also display a toast.
 * @param  {Object} $delegate
 * @param  {Object} exceptionHandler
 * @param  {Object} logger
 * @return {Function} the decorated $exceptionHandler service
 */
/* @ngInject */
function extendExceptionHandler($delegate, exceptionHandler, logger) {
  return function(exception, cause) {
    let appErrorPrefix = 'FIXME' || '';
    // let appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
    let errorData = {
      exception: exception,
      cause: cause
    };

    exception.message = appErrorPrefix + exception.message;
    $delegate(exception, cause);

    logger.error(exception.message, errorData);
  };
}
