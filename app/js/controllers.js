'use strict';

/* Controllers */

function cleanData(data) {
  var out = {}
  Object.keys(data).forEach(function(key) {
    var newKey = key.replace(/@/g, "");
    out[newKey] = data[key];
  });
  return out;
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
