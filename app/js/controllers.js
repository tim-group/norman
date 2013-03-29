'use strict';

/* Controllers */

function cleanData(data) {
  var out = {};
  for (var key in data) {
    var newKey = key.replace(/@/g, "");
    out[newKey] = data[key];
  }
  return out;
}

function ReportListCtrl($scope, $http) {
  $http.get('data/reports_latest.json').success(function(data) {
    var d = [];
    data.forEach(function(datum) {
        d.push(cleanData(datum));
    });
    $scope.reports = d;
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
