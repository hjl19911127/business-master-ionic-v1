(function () {
  'use strict';
  angular.module('home.controllers', [])
    .controller('HomeCtrl', ['$scope', '$state', 'LocalStorageService', function ($scope, $state, LocalStorageService) {
      var USER_KEY = 'USER_INFO', IS_LOGIN_KEY = 'IS_LOGIN';
      $scope.$on('$ionicView.enter', function (event, data) {
        var isLogin = Boolean(LocalStorageService.get(IS_LOGIN_KEY));
        if (!isLogin) $state.go('login');
      })
    }]);
})();
