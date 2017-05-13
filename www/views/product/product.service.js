(function () {
  'use strict';
  angular.module('product.service', [])
    .factory('ProductService', ['LocalStorageService', function (LocalStorageService) {
      var service = {}, key = 'PRODUCT', defaultProducts = [
        { id: 1, images: [], name: 'iphone7', price: '5388', stock: 12, barcode: '12121212112' },
        { id: 2, images: [], name: 'node7', price: '5388', stock: 120, barcode: '12121212112' },
        { id: 3, images: [], name: '小米5 plus', price: '1999', stock: 12, barcode: '12121212112' },
        { id: 4, images: [], name: 'iPhone7 plus', price: '6388', stock: 12, barcode: '12121212112' },
        { id: 5, images: [], name: '华为 P9', price: '3388', stock: 19, barcode: '12121212112' },
        { id: 6, images: [], name: '小米5', price: '1599', stock: 9, barcode: '12121212112' },
        { id: 7, images: [], name: 'iphone7p', price: '5388', stock: 12, barcode: '12121212112' },
        { id: 8, images: [], name: 'node71', price: '5388', stock: 120, barcode: '12121212112' },
        { id: 9, images: [], name: '小米5z plus', price: '1999', stock: 12, barcode: '12121212112' },
        { id: 10, images: [], name: 'iPhone7a plus', price: '6388', stock: 12, barcode: '12121212112' },
        { id: 11, images: [], name: '华为 P93', price: '3388', stock: 19, barcode: '12121212112' },
        { id: 12, images: [], name: '小米52', price: '1599', stock: 9, barcode: '12121212112' },
        { id: 13, images: [], name: 'iphone7', price: '5388', stock: 12, barcode: '12121212112' },
        { id: 14, images: [], name: 'node7', price: '5388', stock: 120, barcode: '12121212112' },
        { id: 15, images: [], name: '小米5 plus', price: '1999', stock: 12, barcode: '12121212112' },
        { id: 16, images: [], name: 'iPhone7 plus', price: '6388', stock: 12, barcode: '12121212112' },
        { id: 17, images: [], name: '华为 P9', price: '3388', stock: 19, barcode: '12121212112' },
        { id: 18, images: [], name: '小米5', price: '1599', stock: 9, barcode: '12121212112' },
        { id: 19, images: [], name: 'iphone7p', price: '5388', stock: 12, barcode: '12121212112' },
        { id: 20, images: [], name: 'node71', price: '5388', stock: 120, barcode: '12121212112' },
        { id: 21, images: [], name: '小米5z plus', price: '1999', stock: 12, barcode: '12121212112' },
        { id: 22, images: [], name: 'iPhone7a plus', price: '6388', stock: 12, barcode: '12121212112' },
        { id: 23, images: [], name: '华为 P93', price: '3388', stock: 19, barcode: '12121212112' },
        { id: 24, images: [], name: '小米52', price: '1599', stock: 9, barcode: '12121212112' },
      ];

      service.init = function () {
        this.originData = LocalStorageService.get(key);
        if (!this.originData) {
          LocalStorageService.update(key, defaultProducts);
          this.originData = defaultProducts;
        }
        this.originData = this.originData.sort(function (v1, v2) {
          return v2.id - v1.id;
        })
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
        return angular.copy(this.originData);
      }
      service.getProductById = function (id) {
        return angular.copy(this.dataMap[id]);
      }

      service.query = function (page, size, name) {
        var res = name ? this.originData.filter(function (v) {
          return ~v.name.indexOf(name);
        }) : angular.copy(this.originData);
        return { items: angular.copy(res).splice(page * size, size), total: res.length };
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
