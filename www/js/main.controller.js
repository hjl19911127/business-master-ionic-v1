(function () {
  'use strict';
  angular.module('main.controllers', [])
    .controller('MainCtrl', ['$scope', 'LocalStorageService', '$state', '$ionicHistory', function ($scope, LocalStorageService, $state, $ionicHistory) {
      var app = LocalStorageService.get('APP', {
        version: '1.0.0',
        run: false
      });
      if (app.run === false) {
        app.run = true;
        LocalStorageService.update('APP', app);
        $ionicHistory.nextViewOptions({
          historyRoot: true
        })
        $state.go('welcome', {}, { location: 'replace' });
      } else {
        $ionicHistory.nextViewOptions({
          historyRoot: true
        })
        $state.go('app.home', {}, { location: 'replace' });
      }
    }]);
})();
