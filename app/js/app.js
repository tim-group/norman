'use strict';

/* App Module */

window.norman = angular.module('norman', ['normanServices', 'normanFilters']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/latest', {templateUrl: 'partials/report-latest.html',   controller: 'ReportListCtrl'}).
      when('/report/:index/:uuid', {templateUrl: 'partials/report-detail.html', controller: 'ReportDetailCtrl'}).
      otherwise({redirectTo: '/latest'});
}]);
