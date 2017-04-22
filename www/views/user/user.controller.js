(function () {
  'use strict';
  angular.module('user.controllers', ['password.controllers'])
    .controller('UserCtrl', ['$scope', '$state', '$ionicPopup', 'LocalStorageService', '$ionicHistory', function ($scope, $state, $ionicPopup, LocalStorageService, $ionicHistory) {
    }])
})();
