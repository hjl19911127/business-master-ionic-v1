(function () {
  'use strict';
  angular.module('category-add.controllers', [])
    .controller('categoryAddCtrl', ['$scope', '$state', 'LocalStorageService', '$ionicHistory', '$ionicActionSheet', '$stateParams', function ($scope, $state, LocalStorageService, $ionicHistory, $ionicActionSheet, $stateParams) {
        $scope.addCategory = $stateParams.id == '0';

    }]);
})();
