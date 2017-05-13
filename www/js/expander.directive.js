(function () {
  'use strict';
  angular.module('expander.directives', [])
    .directive('expanderDirective', function () {
      return {
        restrict: 'E',
        // replace: true,
        transclude: true,
        template: '<div style="position:absolute;bottom:{{bottom}};width:100%;height:44px;text-align:center">\
                    <h6>©2010-2017 生意专家</h6>\
                  </div>'
      }
    });
})();
