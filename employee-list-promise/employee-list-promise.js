(function (angular, _) {
  'use strict';

  class EmployeeListController {
    constructor(employeeLoader) {
      this.nameFilter = '',
      this.sort = 'last_name';
      this.filteredList = undefined;
      this.selectedEmployee = undefined;
      this.selectedId = undefined;

      this.employeeLoader = employeeLoader;
      this.nameFilterChanged(); // inital data load
    }

    nameFilterChanged() {
      this.employeeLoader.getList(this.nameFilter)
        .then(list => _.sortBy(list, this.sort))
        .then(x => this.filteredList = x);
    }

    sortChanged() {
      this.filteredList = _.sortBy(this.filteredList, this.sort);
    }

    employeeClicked(id) {
      this.selectedId = id;
      this.employeeLoader.getDetails(id)
        .then(x => this.selectedEmployee = x);
    }
  }

  angular.module('app')
    .component('employeeListPromise', {
      templateUrl: 'employee-list-promise/employee-list-promise.html',
      controller: EmployeeListController
    });

}(angular, _));
