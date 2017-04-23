(function () {
  'use strict';
  angular.module('login.controllers', [])
    .controller('LoginCtrl', ['$scope', '$state', '$ionicPopup', 'UserService', function ($scope, $state, $ionicPopup, UserService) {
      var userData = UserService.getUserData();
      $scope.loginData = UserService.getRememberUser();
      $scope.login = function () {
        if ($scope.loginData.username == userData.username && $scope.loginData.password == userData.password) {
          UserService.updateRememberUser($scope.loginData);
          UserService.updateIsLogin(true);
          $state.go('app.home', {}, { location: 'replace' })
        } else {
          $ionicPopup.alert({
            title: '警告',
            template: '您的用户名或者密码错误',
            okText: '确定',
            okType: 'button-energized'
          })
        }
      }
    }])
})();
