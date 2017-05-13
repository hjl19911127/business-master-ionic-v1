// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services','starter.directives'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainCtrl'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'views/welcome/welcome.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'views/forgotpassword/forgotpassword.html'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('app.product', {
        url: '/product',
        views: {
          'menuContent': {
            templateUrl: 'views/product/product.html',
            controller: 'ProductCtrl'
          }
        }
      })
      .state('app.productAdd', {
        url: '/productadd',
        views: {
          'menuContent': {
            templateUrl: 'views/product/product-add.html',
            controller: 'ProductAddCtrl'
          }
        }
      })
      .state('app.category', {
        url: '/category',
        params: {
          activeId: 0
        },
        views: {
          'menuContent': {
            templateUrl: 'views/category/category.html',
            controller: 'categoryCtrl'
          }
        }
      })
      .state('app.categoryAdd', {
        url: '/categoryadd/:id',
        views: {
          'menuContent': {
            templateUrl: 'views/category/category-add.html',
            controller: 'categoryAddCtrl'
          }
        }
      })
      .state('app.categoryEdit', {
        url: '/categoryedit/:id',
        views: {
          'menuContent': {
            templateUrl: 'views/category/category-edit.html',
            controller: 'categoryEditCtrl'
          }
        }
      })
      .state('app.setting', {
        url: '/setting',
        views: {
          'menuContent': {
            templateUrl: 'views/setting/setting.html',
            controller: 'SettingCtrl'
          }
        }
      })
      .state('app.shop', {
        url: '/shop',
        views: {
          'menuContent': {
            templateUrl: 'views/shop/shop.html',
            controller: 'ShopCtrl'
          }
        }
      })
      .state('app.shopEdit', {
        url: '/shopedit',
        params: {
          'title': null,
          'key': ''
        },
        views: {
          'menuContent': {
            templateUrl: 'views/shop/shop-edit.html',
            controller: 'ShopEditCtrl'
          }
        }
      })
      .state('app.userPassword', {
        url: '/user/password',
        views: {
          'menuContent': {
            templateUrl: 'views/user/password.html',
            controller: 'PasswordCtrl'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'views/about/about.html',
            controller: 'AboutCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  });
