(function () {
  'use strict';
  angular.module('category-add.controllers', [])
    .controller('categoryAddCtrl', ['$scope', '$state', 'CategoryService', '$ionicHistory', '$ionicActionSheet', '$stateParams', function ($scope, $state, CategoryService, $ionicHistory, $ionicActionSheet, $stateParams) {
      $scope.addCategory = $stateParams.id == '0';
      $scope.category = CategoryService.getCategoryById($stateParams.id) || { name: '' };
      $scope.sections = [{ name: '' }]
      $scope.addSection = function () {
        var emptyLines = $scope.sections.filter(function (v) {
          return !v.name;
        })
        if (!emptyLines.length) $scope.sections.push({ name: '' });
      }
      $scope.removeSection = function (index) {
        $scope.sections.splice(index, 1);
      }
      $scope.saveCategory = function () {
        var emptyLines = $scope.sections.filter(function (v) {
          return !v.name;
        });
        if ((!$scope.category.id && $scope.category.name) || ($scope.category.id && !emptyLines.length)) {
          if ($scope.category.id) {
            CategoryService.createSubCategory($scope.category.id, $scope.sections);
          } else {
            $scope.category.children = $scope.sections;
            CategoryService.addCategory($scope.category);
          }
        }
        $ionicHistory.goBack();
      }
    }]);
})();
