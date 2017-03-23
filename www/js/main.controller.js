(function () {
  'use strict';
  angular.module('main.controllers', [])
    .controller('MainCtrl', ['$scope', 'LocalStorageService', '$state', function ($scope, LocalStorageService, $state) {
      LocalStorageService.add('App', {
        version: '1.0.0',
        run: false
      });
      var app = LocalStorageService.get('App', {
        version: '1.0.0',
        run: false
      });
      if (app.run === false) {
        app.run = true;
        LocalStorageService.update('App', app);
        $state.go('welcome');
      } else {
        $state.go('app.home');
      }
    }]);
})();
