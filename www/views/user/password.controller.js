(function () {
  'use strict';
  angular.module('password.controllers', [])
    .controller('PasswordCtrl', ['$scope', '$state', '$ionicPopup', 'UserService', '$ionicHistory', function ($scope, $state, $ionicPopup, UserService, $ionicHistory) {
      var userData = null;
      $scope.$on('$ionicView.beforeEnter', function (event, data) {
        userData = UserService.getUserData();
      })
      $scope.model = {
        op: '',
        p: '',
        cp: ''
      };
      $scope.save = function () {
        if ($scope.model.op === userData.password) {
          if ($scope.model.p && ($scope.model.p === $scope.model.cp)) {
            userData.password = $scope.model.p;
            UserService.updateUserData(userData);
            $ionicHistory.nextViewOptions({
              historyRoot: true
            })
            $state.go('login', {}, {});
          } else {
            $ionicPopup.alert({
              title: '警告',
              template: '您两次输入的密码不一致',
              okText: '确定',
              okType: 'button-energized'
            })
          }
        } else {
          $ionicPopup.alert({
            title: '警告',
            template: '您输入的密码错误',
            okText: '确定',
            okType: 'button-energized'
          })
        }
      }
    }])
})();
