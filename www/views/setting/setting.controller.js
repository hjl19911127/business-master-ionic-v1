(function () {
  'use strict';
  angular.module('setting.controllers', [])
    .controller('SettingCtrl', ['$scope', '$state', '$ionicPopup', 'UserService', '$ionicHistory', function ($scope, $state, $ionicPopup, UserService, $ionicHistory) {
      $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.home');
      };
      $scope.exitApp = function () {
        UserService.updateIsLogin(false);
        $ionicHistory.nextViewOptions({
          historyRoot: true
        })
        $state.go('login', {}, { location: 'replace' });
      }
    }])
})();
