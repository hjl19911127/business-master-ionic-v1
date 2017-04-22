(function () {
  'use strict';
  angular.module('home.controllers', [])
    .controller('HomeCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
      $scope.$on('$ionicView.beforeEnter', function (event, data) {
        var isLogin = UserService.getIsLogin();
        if (!isLogin) $state.go('login');
      })
    }]);
})();
