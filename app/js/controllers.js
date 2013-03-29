'use strict';

/* Controllers */

function ReportListCtrl($scope, $http) {
  $http.get('data/reports_latest.json').success(function(data) {
	var jsonStringWithoutEvilAtSigns = angular.toJson(data).replace(/@/g, "")
    $scope.reports = angular.fromJson(jsonStringWithoutEvilAtSigns);
  });

  $scope.orderProp = 'age';
}

//ReportListCtrl.$inject = ['$scope', '$http'];


function ReportDetailCtrl($scope, $routeParams, $http) {
  $scope.uuid = $routeParams.uuid;
  $http.get('data/' + $routeParams.uuid + '.json').success(function(data) {
      $scope.report = data;
  });
}

//ReportDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];
