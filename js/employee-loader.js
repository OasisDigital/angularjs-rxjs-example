(function (angular) {
  'use strict';

  // Configure the amount of latency and jitter to simulate
  // Try 300 / 3000 to see trouble easily.
  const API_LATENCY = 100;
  const API_JITTER = 100;

  class EmployeeLoader {
    constructor($http, randomPromiseDelay) {
      this.$http = $http;
      this.randomPromiseDelay = randomPromiseDelay;
    }

    getList(searchText) {
      return this.$http.get('/employees',
        {
          params: {
            'q': searchText,
            '&_limit': 20
          }
        })
        .then(response => response.data)
        .then(this.randomPromiseDelay(API_LATENCY, API_JITTER));
    }

    getDetails(employeeId) {
      return this.$http.get(`/employees/${employeeId}`)
        .then(response => response.data)
        .then(this.randomPromiseDelay(API_LATENCY, API_JITTER));
    }
  }

  angular.module('app')
    .service('employeeLoader', EmployeeLoader); // Note the case for each

}(angular));
