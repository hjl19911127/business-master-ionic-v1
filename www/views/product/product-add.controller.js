(function () {
  'use strict';
  angular.module('prodcut-add.controllers', [])
    .controller('ProductAddCtrl', ['$scope', '$state', '$ionicPopup', '$ionicActionSheet', 'ProductService', 'CategoryService', '$ionicHistory', '$stateParams', '$cordovaBarcodeScanner', '$cordovaCamera', function ($scope, $state, $ionicPopup, $ionicActionSheet, ProductService, CategoryService, $ionicHistory, $stateParams, $cordovaBarcodeScanner, $cordovaCamera) {
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
        }, function (error) {
          alert(error);
        })
      }
      function camera() {
        var options = {
          quality: 50,
        }
      }
      $scope.showActionSheet = function () {
        $ionicActionSheet.show({
          buttons: [{ 'text': '拍照' }, { 'text': '从相册中选取' }],
          cancelText: '<b>取消</b>',
          buttonClicked: function (index) {
            switch (index) {
              case 0:
                camera();
                break;
              case 1:
                pickImage();
                break;
            }
          }
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
