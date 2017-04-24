(function () {
  'use strict';
  angular.module('product.controllers', ['prodcut-add.controllers'])
    .controller('ProductCtrl', ['$scope', '$state', '$ionicPopup', 'ProductService', '$ionicHistory', function ($scope, $state, $ionicPopup, ProductService, $ionicHistory) {

      $scope.products = ProductService.getAll();
    }])
})();
