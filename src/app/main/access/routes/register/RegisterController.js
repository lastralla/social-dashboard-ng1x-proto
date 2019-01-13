class RegisterController {

  /* @ngInject */
  constructor($state, $scope) {
    this.message = $state.current.data.message; // temp
  }

}

export { RegisterController };
