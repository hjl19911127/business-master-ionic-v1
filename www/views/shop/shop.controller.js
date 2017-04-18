(function () {
  'use strict';
  angular.module('shop.controllers', ['shop-edit.controllers'])
    .controller('ShopCtrl', ['$scope', '$state', '$ionicPopup', 'LocalStorageService', '$ionicHistory', function ($scope, $state, $ionicPopup, LocalStorageService, $ionicHistory) {
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

    }])
})();
