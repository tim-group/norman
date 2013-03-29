'use strict';

/* Controllers */

function cleanData(data) {
  var jsonStringWithoutEvilAtSigns = angular.toJson(data).replace(/@/g, "")
  return angular.fromJson(jsonStringWithoutEvilAtSigns);
}

function ReportListCtrl($scope, $http) {
  $http.get('data/reports_latest.json').success(function(data) {
    $scope.reports = cleanData(data);
  });

  $scope.orderProp = 'age';
}

//ReportListCtrl.$inject = ['$scope', '$http'];


function ReportDetailCtrl($scope, $routeParams, $http) {
  $scope.uuid = $routeParams.uuid;
  $http.get('data/' + $routeParams.uuid + '.json').success(function(data) {
    $scope.report = cleanData(data);
  });
}

//ReportDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];
