(function (angular) {
  'use strict';

  angular.module('app')
    .component('employeeDetailView', {
      templateUrl: 'employee-detail-view/employee-detail-view.html',
      bindings: {
        employee: '<'
      }
    });

}(angular));
