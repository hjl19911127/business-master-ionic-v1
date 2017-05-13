(function () {
  'use strict';
  angular.module('company.directives', [])
    .directive('companyDirective', function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div style="position:absolute;bottom:0px;width:100%;height:44px;text-align:center">\
                    <h6>©2010-2017 生意专家</h6>\
                  </div>'
      }
    });
})();
