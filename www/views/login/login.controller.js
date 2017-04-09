(function () {
  'use strict';
  angular.module('login.controllers', [])
    .controller('LoginCtrl', ['$scope', '$state', '$ionicPopup', 'LocalStorageService', function ($scope, $state, $ionicPopup, LocalStorageService) {
      var USER_KEY = 'USER_INFO', IS_LOGIN_KEY = 'IS_LOGIN';
      $scope.loginData = LocalStorageService.get(USER_KEY, {
        username: '',
        password: ''
      })
      $scope.login = function () {
        if ($scope.loginData.username == 'admin' && $scope.loginData.password == '123456') {
          LocalStorageService.update(USER_KEY, $scope.loginData);
          LocalStorageService.update(IS_LOGIN_KEY, 'true');
          $state.go('app.home', {})
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
