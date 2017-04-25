(function () {
  'use strict';
  angular.module('product.controllers', ['prodcut-add.controllers'])
    .controller('ProductCtrl', ['$scope', '$state', '$ionicPopup', 'ProductService', '$ionicHistory', '$ionicLoading', '$timeout', function ($scope, $state, $ionicPopup, ProductService, $ionicHistory, $ionicLoading, $timeout) {
      $scope.$on('$ionicView.beforeEnter', function (event, data) {
        $scope.isReady = false;
        $scope.show();
        $scope.products = ProductService.getAll();
        $timeout(function () {
          $ionicLoading.hide();
          $scope.isReady = true;
        }, 1000);
      });
      $scope.getByName = function () {

      }
      $scope.show = function () {
        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner>',
          // duration: 1000
        });
      };
      $scope.hide = function () {
        $ionicLoading.hide();
      };
    }])
})();
