(function () {
  'use strict';
  angular.module('category.service', ['localStorage.service'])
    .factory('CategoryService', ['LocalStorageService', function (LocalStorageService) {
      var key = 'CATEGORY', defaultCategories = [
        { 'id': 1, 'name': '电脑整机', 'parent_id': 0 },
        { 'id': 2, 'name': '电脑配件', 'parent_id': 0 },
        { 'id': 3, 'name': '外设产品', 'parent_id': 0 },
        { 'id': 4, 'name': '网络产品', 'parent_id': 0 },
        { 'id': 5, 'name': '笔记本', 'parent_id': 1 },
        { 'id': 6, 'name': '台式机', 'parent_id': 1 },
        { 'id': 7, 'name': '平板电脑', 'parent_id': 1 },
        { 'id': 8, 'name': 'CPU', 'parent_id': 2 },
        { 'id': 9, 'name': '内存', 'parent_id': 2 },
        { 'id': 10, 'name': '鼠标', 'parent_id': 3 },
        { 'id': 11, 'name': '键盘', 'parent_id': 3 },
        { 'id': 12, 'name': 'U盘', 'parent_id': 3 },
        { 'id': 13, 'name': '路由器', 'parent_id': 4 },
        { 'id': 14, 'name': '交换机', 'parent_id': 4 },
        { 'id': 15, 'name': '网卡', 'parent_id': 4 },
        { 'id': 16, 'name': '网络配件', 'parent_id': 4 }
      ];
      service.get = function (isTree, id) {
        var val = LocalStorageService.get(key, defaultCategories);
        if (id) val = val[id];
        return val;
      }
      service.update = function (id, value) {
        var val = LocalStorageService.get(key, defaultCategories);

      }
      service.addCategory = function (value) {
        LocalStorageService.get(key, defaultCategories);
        return
      }
      service.addSubCategory = function (value) {
        LocalStorageService.get(key, defaultCategories);
      }
      service.deleteCategory = function (key) {
        LocalStorageService.get(key, defaultCategories);
      }
      return service;
    }]);
})();
