(function () {
  'use strict';
  angular.module('category-edit.controllers', [])
    .controller('categoryEditCtrl', ['$scope', '$state', 'CategoryService', '$ionicHistory', '$ionicPopup', '$stateParams', function ($scope, $state, CategoryService, $ionicHistory, $ionicPopup, $stateParams) {
      $scope.category = CategoryService.getCategoryById($stateParams.id);
      $scope.sections = $scope.category.children || [];
      $scope.addSection = function () {
        var emptyLines = $scope.sections.filter(function (v) {
          return !v.name;
        })
        if (!emptyLines.length) $scope.sections.push({ name: '' });
      }
      $scope.removeCategory = function () {
        $ionicPopup.confirm({
          title: '您确认要删除吗？',
          template: '请先删除该类别下的所有商品记录',
          cancelText: '取消',
          okText: '确认'
        }).then(function (res) {
          CategoryService.deleteCategory($scope.category.id);
          $state.go('app.category', {
            activeId: $scope.category.id
          }, { location: 'replace' });
        })
      }
      $scope.removeSection = function (index) {
        $ionicPopup.confirm({
          title: '您确认要删除吗？',
          template: '请先删除该类别下的所有商品记录',
          cancelText: '取消',
          okText: '确认'
        }).then(function (res) {
          $scope.sections.splice(index, 1);
        })
      }
      $scope.saveCategory = function () {
        var emptyLines = $scope.sections.filter(function (v) {
          return !v.name;
        });
        if ($scope.category.name && !emptyLines.length) {
          $scope.category.children = $scope.sections;
          CategoryService.updateCategory($scope.category.id, $scope.category);
          $state.go('app.category', {
            activeId: $scope.category.id
          }, { location: 'replace' });
        }
      }
    }]);
})();
