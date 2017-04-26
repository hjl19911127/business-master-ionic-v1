(function () {
  'use strict';
  angular.module('product.controllers', ['prodcut-add.controllers'])
    .controller('ProductCtrl', ['$scope', '$state', '$ionicPopup', 'ProductService', '$ionicHistory', '$ionicLoading', '$timeout', function ($scope, $state, $ionicPopup, ProductService, $ionicHistory, $ionicLoading, $timeout) {
      $scope.$on('$ionicView.beforeEnter', function (event, data) {
        $scope.isReady = false;
        $scope.loadingMore = false;
        $scope.show();
        $scope.doRefresh();
        $timeout(function () {
          $ionicLoading.hide();
          $scope.isReady = true;
        }, 1000);
        $scope.model.name = '';
      });
      $scope.size = 10;
      $scope.doRefresh = function () {
        $scope.page = 0;
        $scope.search(true);
        $timeout(function () {
          $scope.$broadcast('scroll.refreshComplete')
        }, 1000);
      }
      $scope.model = {};
      $scope.getByName = function () {
        $scope.page = 0;
        $scope.search(true);
      }
      $scope.loadMore = function () {
        $scope.page++;
        $scope.search();
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
      $scope.search = function (refresh) {
        var data = ProductService.query($scope.page, $scope.size, $scope.model.name);
        $scope.products = !refresh ? ($scope.products || []).concat(data.items) : data.items;
        $scope.total = data.total;
      }
      $scope.show = function () {
        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner>',
        });
      };
      $scope.hide = function () {
        $ionicLoading.hide();
      };
      $scope.moreDataCanBeLoaded = function () {
        if ($scope.products && $scope.total > $scope.products.length && !$scope.isLoading) {
          return true;
        } else {
          return false;
        }
      }
    }])
})();
