(function () {
  'use strict';
  angular.module('user.controllers', ['password.controllers'])
    .controller('UserController', ['$scope', '$state', '$ionicPopup', 'LocalStorageService', '$ionicHistory', function ($scope, $state, $ionicPopup, LocalStorageService, $ionicHistory) {
    }])
})();
