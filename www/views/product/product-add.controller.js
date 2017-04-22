(function () {
  'use strict';
  angular.module('prodcut-add.controllers', [])
    .controller('ProductAddCtrl', ['$scope', '$state', '$ionicPopup', 'ProductService', 'CategoryService', '$ionicHistory', '$stateParams', '$cordovaBarcodeScanner', '$cordovaCamera', function ($scope, $state, $ionicPopup, ProductService, CategoryService, $ionicHistory, $stateParams, $cordovaBarcodeScanner, $cordovaCamera) {
      $scope.product = {
        images: [],
        barcode: '',
        category: {
          id: 0,
          name: '默认分类',
          section: {
            id: 0,
            name: ''
          }
        },
        name: '',
        price: '',
        cost: '',
        store: '',
        size: '',
        remark: '',
        supplier: ''
      }
      $scope.$on('ActiveCategoryUpdate', function () {
        $scope.product.category = CategoryService.activeCategory;
      })
      $scope.scanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (barcodeData) {
          $scope.product.barcode = barcodeData.text;
           alert(barcodeData.text);
        },function (error) {
          alert(error);
        })
      }
      $scope.save = function () {

      }
      $scope.saveAndNew = function () {
        $scope.save();
        $state.reload();
      }
    }])
})();
