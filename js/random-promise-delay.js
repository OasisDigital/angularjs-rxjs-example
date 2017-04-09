(function (angular) {
  'use strict';

  // Use this in a promise chain to delay values passing through by
  // between baseMs milliseconds and baseMs+spanMs milliseconds.

  const randomPromiseDelay =
    $timeout =>
      (baseMs, spanMs) =>
        value => {
          const delay = Math.round(baseMs + Math.random() * spanMs);
          console.log('random delay', delay, 'ms');
          return $timeout(() => value, delay);
        };

  angular.module('app')
    .factory('randomPromiseDelay', randomPromiseDelay);

}(angular));
