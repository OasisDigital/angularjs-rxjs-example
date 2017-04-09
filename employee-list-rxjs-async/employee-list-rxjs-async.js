(function (angular, _, Rx) {
  'use strict';

  class EmployeeListController {
    constructor(employeeLoader) {
      this.nameFilter = '';
      this.sort = 'last_name';
      this.nameFilter$ = new Rx.BehaviorSubject(this.nameFilter);
      this.sort$ = new Rx.BehaviorSubject(this.sort);
      this.selectedId$ = new Rx.Subject();

      this.filteredList$ = Rx.Observable.combineLatest(
        this.nameFilter$.switchMap(nameFilter =>
          Rx.Observable.fromPromise(
            employeeLoader.getList(nameFilter))),
        this.sort$,
        (list, sort) => _.sortBy(list, sort)
      );

      this.selectedEmployee$ = this.selectedId$
        .switchMap(id =>
          Rx.Observable.fromPromise(
            employeeLoader.getDetails(id)));
    }
  }

  angular.module('app')
    .component('employeeListRxjsAsync', {
      templateUrl: 'employee-list-rxjs-async/employee-list-rxjs-async.html',
      controller: EmployeeListController
    });

}(angular, _, Rx));
