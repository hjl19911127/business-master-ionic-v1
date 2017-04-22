(function () {
  'use strict';
  angular.module('prodcut-add.controllers', [])
    .controller('ProductAddCtrl', ['$scope', '$state', '$ionicPopup', 'ProductService', 'CategoryService', '$ionicHistory', '$stateParams', function ($scope, $state, $ionicPopup, ProductService, CategoryService, $ionicHistory, $stateParams) {
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

      }
      $scope.save = function () {

      }
      $scope.saveAndNew = function () {
        $scope.save();
        $state.reload();
      }
    }])
})();
