import angular from 'angular';

angular
  .module('sdApp.utils.helpers')
  .directive('sdCompareToModel', sdCompareToModel);

////////// Functions //////////

function sdCompareToModel() {
  let ddo = {
    require: 'ngModel',
    scope: {
      sdCompareToModel: '='
    },
    link: linkFn
  };

  return ddo;

  ////////// Functions //////////

  function linkFn(scope, element, attributes, ngModel) {
    ngModel.$validators.compareToModel = (modelValue) => {
      return modelValue === scope.sdCompareToModel;
    };

    // TODO use $onChanges? http://www.codelord.net/2016/04/14/angular-1-dot-5-new-component-lifecycle-hooks/
    scope.$watch('sdCompareToModel', () => {
      ngModel.$validate();
    });
  }

}
