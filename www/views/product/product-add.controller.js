(function () {
  'use strict';
  angular.module('prodcut-add.controllers', [])
    .controller('ProductAddCtrl', ['$scope', '$state', '$ionicPopup', '$ionicActionSheet', 'ProductService', 'CategoryService', '$ionicHistory', '$stateParams', '$cordovaBarcodeScanner', '$cordovaCamera', '$cordovaImagePicker', function ($scope, $state, $ionicPopup, $ionicActionSheet, ProductService, CategoryService, $ionicHistory, $stateParams, $cordovaBarcodeScanner, $cordovaCamera, $cordovaImagePicker) {
      var emptyProduct = {
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
        supplier: {
          name: '',
          phone: ''
        }
      }, emptySupplier = {
        name: '',
        phone: ''
      }
      $scope.product = angular.copy(emptyProduct);
      $scope.supplier = angular.copy(emptySupplier);

      $scope.$on('ActiveCategoryUpdate', function () {
        $scope.product.category = CategoryService.activeCategory;
      })
      $scope.scanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (barcodeData) {
          $scope.product.barcode = barcodeData.text;
          alert(barcodeData.text);
        }, function (err) {
          alert(err);
        })
      }
      function camera() {
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          correctOrientation: true,
          saveToPhotoAlbum: false,
          popoverOptions: CameraPopoverOptions,
        }
        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.product.images.push(imageData);
        }, function (err) {
          alert(err);
        })
      }
      function pickImage() {
        var options = {
          maximumImagesCount: 3,
          width: 0,
          height: 0,
          quality: 80
        }
        $cordovaImagePicker.getPictures(options).then(function (results) {
          for (var i = 0; i < results.length; i++) {
            $scope.product.images.push(results[i]);
          }
        }, function (err) {
          alert(err);
        })
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
      $scope.selectSupplier = function () {
        $ionicPopup.show({
          title: '新增供应商',
          templateUrl: 'views/supplier/supplier.html',
          scope: $scope,
          buttons: [{
            text: '取消',
            type: 'button-energized button-outline',
            onTap: function (e) {
              $scope.supplier = angular.copy(emptySupplier);
            }
          }, {
            text: '确定',
            type: 'button-energized',
            onTap: function (e) {
              $scope.product.supplier = angular.copy($scope.supplier);
              $scope.supplier = angular.copy(emptySupplier);
            }
          }]
        }).then(function (res) {
        })
      }
      function saveProduct(callback) {
        $ionicPopup.confirm({
          title: '您确认要新增商品吗？',
          cancelText: '取消',
          okText: '确认'
        }).then(function () {
          ProductService.createProduct($scope.product);
          callback();
        })
      }
      $scope.save = function () {
        saveProduct(function (res) {
          $ionicHistory.goBack();
        }.bind(this));
      }
      $scope.saveAndNew = function () {
        saveProduct(function (res) {
          $scope.product = angular.copy(emptyProduct);
          $scope.supplier = angular.copy(emptySupplier);
          $state.reload();
        }.bind(this));
      }
    }])
})();
