(function () {
  'use strict';
  angular.module('user.service', [])
    .factory('UserService', ['LocalStorageService', function (LocalStorageService) {
      var service = {},
        USER_DATA_KEY = 'USER_DATA',
        RE_USER_KEY = 'USER_INFO',
        IS_LOGIN_KEY = 'IS_LOGIN',
        defaultUser = {
          username: 'admin',
          password: '123456'
        }, defaultIsLogin = {
          value: false
        };
      service.init = function () {
        this.userData = LocalStorageService.get(USER_DATA_KEY);
        this.isLogin = LocalStorageService.get(IS_LOGIN_KEY);
        if (!this.userData) {
          LocalStorageService.add(USER_DATA_KEY, defaultUser);
          this.userData = defaultUser;
        };
        if (!this.isLogin) {
          LocalStorageService.add(IS_LOGIN_KEY, defaultIsLogin);
          this.isLogin = defaultIsLogin;
        }
      }
      service.getUserData = function () {
        return this.userData;
      }
      service.updateUserData = function (user) {
        LocalStorageService.update(USER_DATA_KEY, user);
        this.updateIsLogin(false);
        this.userData = user;
        return true;
      }
      service.getRememberUser = function () {
        return LocalStorageService.get(RE_USER_KEY, {
          username: '',
          password: ''
        });
      }
      service.updateRememberUser = function (user) {
        LocalStorageService.update(RE_USER_KEY, user)
        return true;
      }

      service.getIsLogin = function () {
        return this.isLogin.value;
      }
      service.updateIsLogin = function (value) {
        LocalStorageService.update(IS_LOGIN_KEY, { value: value });
        this.isLogin.value = value;
        return true;
      }
      service.init();
      return service;
    }]);
})();
