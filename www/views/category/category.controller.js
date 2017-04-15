(function () {
  'use strict';
  angular.module('category.controllers', ['category-add.controllers'])
    .controller('categoryCtrl', ['$scope', '$state', 'LocalStorageService', '$ionicHistory', '$ionicActionSheet', function ($scope, $state, LocalStorageService, $ionicHistory, $ionicActionSheet) {
      $scope.categories = [
        {
          'id': 1, 'name': '电脑整机',
          'children': [
            { 'id': 5, 'name': '笔记本', children: [] },
            { 'id': 6, 'name': '台式机', children: [] },
            { 'id': 7, 'name': '平板电脑', children: [] },
          ]

        },
        {
          'id': 2, 'name': '电脑配件',
          'children': [
            { 'id': 8, 'name': 'CPU', children: [] },
            { 'id': 9, 'name': '内存', children: [] }
          ]

        },
        {
          'id': 3, 'name': '外设产品',
          'children': [
            { 'id': 10, 'name': '鼠标', children: [] },
            { 'id': 11, 'name': '键盘', children: [] },
            { 'id': 12, 'name': 'U盘', children: [] }
          ]
        },
        {
          'id': 4, 'name': '网络产品',
          'children': [
            { 'id': 13, 'name': '路由器', children: [] },
            { 'id': 14, 'name': '交换机', children: [] },
            { 'id': 15, 'name': '网卡', children: [] },
            { 'id': 16, 'name': '网络配件', children: [] }
          ]
        }
      ];
      $scope.activeCategory = $scope.categories[0];
      $scope.sections = $scope.categories[0].children;
      if ($scope.sections && $scope.sections[0].id != 0) {
        $scope.sections.unshift({ id: 0, name: '无小分类进入大分类' });
      }
      $scope.activeSection = {};
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
                break;
              case 1:
                break;
            }
          }
        })
      }
    }]);
})();
