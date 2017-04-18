(function () {
  'use strict';
  angular.module('setting.controllers', [])
    .controller('SettingCtrl', ['$scope', '$state', '$ionicPopup', 'LocalStorageService', '$ionicHistory', function ($scope, $state, $ionicPopup, LocalStorageService, $ionicHistory) {
      $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.home');
      }
    }])
})();
