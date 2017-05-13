(function () {
  'use strict';
  angular.module('product.controllers', ['prodcut-add.controllers'])
    .controller('ProductCtrl', ['$scope', '$state', '$ionicPopup', 'ProductService', '$ionicHistory', '$ionicLoading', '$timeout', function ($scope, $state, $ionicPopup, ProductService, $ionicHistory, $ionicLoading, $timeout) {
      $scope.$on('$ionicView.beforeEnter', function (event, data) {
        $scope.isReady = false;
        // $scope.loadingMore = false;
        $scope.show();
        $scope.page = 0;
        $scope.size = 10;
        $scope.products = [];
        $scope.doRefresh();
        $scope.isReady = true;
        $timeout(function () {
          $ionicLoading.hide();
          $scope.loadingMore = true;
        }, 1000);
        $scope.model.name = '';
      });
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
        $scope.loadingMore = false;
        $scope.page++;
        $scope.search();
        $timeout(function () {
          $scope.loadingMore = true
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 1000);
      }
      $scope.search = function (refresh) {
        var data = ProductService.query($scope.page, $scope.size, $scope.model.name);
        console.log(data.items.length);
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
        return $scope.loadingMore && $scope.products.length < $scope.total;
      }
    }])
})();
