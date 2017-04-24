(function () {
  'use strict';
  angular.module('category.controllers', ['category-add.controllers', 'category-edit.controllers'])
    .controller('categoryCtrl', ['$scope', '$state', 'CategoryService', '$ionicHistory', '$ionicActionSheet', '$stateParams', function ($scope, $state, CategoryService, $ionicHistory, $ionicActionSheet, $stateParams) {
      var activeId = $stateParams.activeId || 0;
      $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (fromState.name === 'app.productAdd') {
          $scope.showInfo = '无小分类进入大分类';
        }
        if (fromState.name === 'app.product') {
          $scope.showInfo = '全部商品';
        }
      });
      $scope.$on('$ionicView.beforeEnter', function () {
        $scope.categories = CategoryService.getAll(true);
        if (activeId) {
          var find = false;
          $scope.categories.forEach(function (v) {
            if (v.id == activeId) {
              $scope.activeCategory = v;
              $scope.sections = v.children;
              find = true;
              if ($scope.sections && $scope.sections[0].id != 0) {
                $scope.sections.unshift({ id: 0, name: $scope.showInfo });
              }
            }
          })
          if (!find) {
            $scope.activeCategory = $scope.categories[0];
            $scope.sections = $scope.categories[0].children;
            if ($scope.sections && $scope.sections[0].id != 0) {
              $scope.sections.unshift({ id: 0, name: $scope.showInfo });
            }
          }
        } else {
          $scope.activeCategory = $scope.categories[0];
          $scope.sections = $scope.categories[0].children;
          if ($scope.sections && $scope.sections[0].id != 0) {
            $scope.sections.unshift({ id: 0, name: $scope.showInfo });
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
                $scope.sections.unshift({ id: 0, name: $scope.showInfo });
              }
            }
          })
        }
      }
      $scope.selectSection = function (item) {
        $scope.activeSection = {
          id: $scope.activeCategory.id,
          name: $scope.activeCategory.name,
          section: {
            id: item.id,
            name: item.id ? item.name : ''
          }
        };
        $ionicHistory.goBack();
      }
      $scope.$watch('activeSection', function (newValue, oldValue) {
        if (newValue) CategoryService.updateActiveCategory(newValue);
      })
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
