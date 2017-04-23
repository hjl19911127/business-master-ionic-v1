(function () {
  'use strict';
  angular.module('product.service', [])
    .factory('ProductService', ['LocalStorageService', function (LocalStorageService) {
      var service = {}, key = 'PRODUCT', defaultProducts = [];

      service.init = function () {
        this.originData = LocalStorageService.get(key);
        if (!this.originData) {
          LocalStorageService.update(key, defaultProducts);
          this.originData = defaultProducts;
        }
        this.refresh();
      }
      service.refresh = function () {
        LocalStorageService.update(key, this.originData);
        this.dataMap = {};
        this.originData.forEach(function (v) {
          this.dataMap[v.id] = v;
        }.bind(this))
        this.nowId = this.originData.length ? Math.max.apply(null, this.originData.map(function (v) {
          return v.id;
        })) : 0;
      }

      service.getAll = function () {
        return this.originData;
      }
      service.getProductById = function (id) {
        return angular.copy(this.dataMap[id]);
      }

      service.createProduct = function (data) {
        data.id = this.nowId + 1;
        this.originData.push(angular.copy(data));
        this.refresh();
        return data.id;
      }


      service.deleteProduct = function (id) {
        this.originData = this.originData.filter(function (v) {
          return v.id != id;
        });
        this.refresh();
        return true;
      }

      service.updateProduct = function (id, data) {
        this.originData.forEach(function (v) {
          if (v.id == id) v.name = data.name;
        });
        this.refresh();
        return this.getProductById(id);
      }
      service.init();
      return service;
    }]);
})();
