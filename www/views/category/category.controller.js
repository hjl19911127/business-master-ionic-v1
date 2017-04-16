(function () {
  'use strict';
  angular.module('category.controllers', ['category-add.controllers', 'category-edit.controllers'])
    .controller('categoryCtrl', ['$scope', '$state', 'CategoryService', '$ionicHistory', '$ionicActionSheet', function ($scope, $state, CategoryService, $ionicHistory, $ionicActionSheet) {
      $scope.$on('$ionicView.enter', function () {
        $scope.categories = CategoryService.getAll(true);
        if ($scope.activeCategory) {
          $scope.categories.forEach(function (v) {
            if (v.id == $scope.activeCategory.id) {
              $scope.activeCategory = v;
              $scope.sections = v.children;
              if ($scope.sections && $scope.sections[0].id != 0) {
                $scope.sections.unshift({ id: 0, name: '无小分类进入大分类' });
              }
            }
          })
        } else {
          $scope.activeCategory = $scope.categories[0];
          $scope.sections = $scope.categories[0].children;
          if ($scope.sections && $scope.sections[0].id != 0) {
            $scope.sections.unshift({ id: 0, name: '无小分类进入大分类' });
          }
        }
      })
      $scope.selectCategory = function (id) {
        if ($scope.activeCategory.id != id) {
          angular.forEach($scope.categories, function (data, index) {
            if (data.id == id) {
              $scope.activeCategory = data;
              $scope.sections = data.children;
              if ($scope.sections && $scope.sections[0].id != 0) {
                $scope.sections.unshift({ id: 0, name: '无小分类进入大分类' });
              }
            }
          })
        }
      }
      $scope.selectSection = function (data) {
        $scope.activeSection = data;
        $ionicHistory.goBack();
      }
      $scope.showActionSheet = function () {
        $ionicActionSheet.show({
          buttons: [{ 'text': '新增小分类' }, { 'text': '编辑分类' }],
          cancelText: '<b>取消</b>',
          buttonClicked: function (index) {
            switch (index) {
              case 0:
                $state.go('app.categoryAdd', { id: $scope.activeCategory.id })
                break;
              case 1:
                $state.go('app.categoryEdit', { id: $scope.activeCategory.id })
                break;
            }
          }
        })
      }
    }]);
})();
