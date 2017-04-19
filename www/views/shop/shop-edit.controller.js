(function () {
  'use strict';
  angular.module('shop-edit.controllers', [])
    .controller('ShopEditCtrl', ['$scope', '$state', '$ionicPopup', 'LocalStorageService', '$ionicHistory', '$stateParams', function ($scope, $state, $ionicPopup, LocalStorageService, $ionicHistory, $stateParams) {
      var key = "SHOP", defaultValue = {
        'title': '黄加樑的店',
        'alias': '小店',
        'registerTime': '2017-04-01 08:00:00',
        'phone': '18305961659',
        'email': 'hjl4347570@163.com',
        'shopOwner': '黄加樑',
        'shopPhone': '18305961659',
        'industryClassification': '软件服务行业',
      };
      $scope.shop = LocalStorageService.get(key, defaultValue);
      $scope.title = $stateParams.title;
      $scope.model = { inputValue: $scope.shop[$stateParams.key] }
      $scope.save = function () {
        $scope.shop[$stateParams.key] = $scope.model.inputValue;
        LocalStorageService.update(key, $scope.shop);
        $ionicHistory.goBack();
      }
    }])
})();
