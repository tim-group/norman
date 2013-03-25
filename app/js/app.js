'use strict';

/* App Module */

angular.module('phonecat', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/latest', {templateUrl: 'partials/report-latest.html',   controller: PhoneListCtrl}).
      when('/report/:uuid', {templateUrl: 'partials/report-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/latest'});
}]);
