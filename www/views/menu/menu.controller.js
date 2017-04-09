(function () {
  'use strict';
  angular.module('menu.controllers', [])
    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', function ($scope, $ionicModal, $timeout) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      // Form data for the login modal
      $scope.loginData = {};
      $scope.shopData = {
        name: '黄加樑',
        phone: '18305961659'
      }

    }])
})();
