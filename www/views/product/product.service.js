(function () {
  'use strict';
  angular.module('product.service', [])
    .factory('ProductService', ['LocalStorageService', function (LocalStorageService) {
      var service = {}, key = 'PRODUCT', defaultCategories = [];

      service.init = function () {
        this.originData = LocalStorageService.get(key);
        if (!this.originData) {
          LocalStorageService.update(key, defaultCategories);
          this.originData = defaultCategories;
        }
        this.refresh();
      }
      service.refresh = function () {
        this.dataMap = {};
        this.originData.forEach(function (v) {
          if (!v.parent_id) {
            var obj = angular.copy(v);
            obj.children = [], this.dataMap[obj.id] = obj;
          }
        }.bind(this));
        this.originData.forEach(function (d) {
          if (d.parent_id) {
            var obj = angular.copy(d);
            this.dataMap[d.parent_id].children.push(obj);
          }
        }.bind(this))
        this.nowId = Math.max.apply(null, this.originData.map(function (v) {
          return v.id;
        })) || 1;
      }

      service.getAll = function (isTree) {
        if (isTree) {
          return Object.keys(this.dataMap).map(function (v) {
            return angular.copy(this.dataMap[v]);
          }.bind(this))
        }
        return this.originData;
      }
      service.getCategoryById = function (id) {
        return angular.copy(this.dataMap[id]);
      }
      service.getSubCategoryByCategoryId = function (cid) {
        return this.dataMap[id] && angular.copy(this.dataMap[id].children);
      }

      service.addCategory = function (data) {
        var subCategory = data.children || [];
        delete data.children;
        var cid = this.createCategory(data);
        if (subCategory.length) {
          this.createSubCategory(cid, subCategory);
        }
        return cid;
      }
      service.createCategory = function (data) {
        data.id = this.nowId;
        data.parent_id = 0;
        this.originData.push(data);
        LocalStorageService.update(key, this.originData);
        this.refresh();
        return data.id;
      }

      service.createSubCategory = function (cid, data) {
        data = data.map(function (v, i) {
          v.id = this.nowId + i + 1;
          v.parent_id = cid;
          return v;
        }.bind(this))
        this.originData = this.originData.concat(data);
        LocalStorageService.update(key, this.originData);
        this.refresh();
        return true;
      }
      service.deleteCategory = function (id) {
        this.originData = this.originData.filter(function (v) {
          return v.parent_id != id && v.id != id;
        });
        LocalStorageService.update(key, this.originData);
        this.refresh();
        return true;
      }
      service.deleteSubCategoryByCategoryId = function (cid) {
        this.originData = this.originData.filter(function (v) {
          return v.parent_id != cid;
        });
        LocalStorageService.update(key, this.originData);
        this.refresh();
        return true;
      }
      service.updateCategory = function (id, data) {
        this.originData.forEach(function (v) {
          if (v.id == id) v.name = data.name;
        })
        if (data.children.length) {
          this.updateSubCategory(id, data.children)
        }
        this.refresh();
        return this.getCategoryById(id);
      }
      service.updateSubCategory = function (cid, data) {
        this.deleteSubCategoryByCategoryId(cid);
        this.createSubCategory(cid, data);
        return true;
      }
      service.init();
      return service;
    }]);
})();
