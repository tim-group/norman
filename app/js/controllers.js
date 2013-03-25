'use strict';

/* Controllers */

function ReportListCtrl($scope, $http) {
  $http.get('data/reports_latest.json').success(function(data) {
    $scope.reports = data;
  });

  $scope.orderProp = 'age';
}

//ReportListCtrl.$inject = ['$scope', '$http'];


function ReportDetailCtrl($scope, $routeParams) {
  $scope.uuid = $routeParams.uuid;
}

//ReportDetailCtrl.$inject = ['$scope', '$routeParams'];
