'use strict';

/* App Module */

angular.module('norman', ['normanServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/latest', {templateUrl: 'partials/report-latest.html',   controller: ReportListCtrl}).
      when('/report/:index/:uuid', {templateUrl: 'partials/report-detail.html', controller: ReportDetailCtrl}).
      otherwise({redirectTo: '/latest'});
}]);
