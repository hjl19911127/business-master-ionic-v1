(function () {
  'use strict';
  angular.module('main.controllers', [])
    .controller('MainCtrl', ['$scope', 'LocalStorageService', '$state', function ($scope, LocalStorageService, $state) {
      var app = LocalStorageService.get('APP', {
        version: '1.0.0',
        run: false
      });
      if (app.run === false) {
        app.run = true;
        LocalStorageService.update('APP', app);
        $state.go('welcome');
      } else {
        $state.go('app.home');
      }
    }]);
})();
