'use strict';

/* Controllers */

function cleanData(data) {
  var jsonStringWithoutEvilAtSigns = angular.toJson(data).replace(/@/g, "")
  return angular.fromJson(jsonStringWithoutEvilAtSigns);
}

function ReportListCtrl($scope, $http) {
  $http.get('data/reports_latest.json').success(function(data) {
    var parsedData = cleanData(data);
    addAllContextsTo(parsedData);
    $scope.reports = parsedData;
  });

  $scope.orderProp = 'age';
}

//ReportListCtrl.$inject = ['$scope', '$http'];

function ReportDetailCtrl($scope, $routeParams, $http) {
  $scope.uuid = $routeParams.uuid;
  $http.get('data/' + $routeParams.uuid + '.json').success(function(data) {
    var parsedData = cleanData(data);
    addContextTo(parsedData);
    $scope.report = parsedData;
  });
}

//ReportDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];

function addAllContextsTo(allData) {
  angular.forEach(allData, function(data) {
    addContextTo(data);
  })
}

function addContextTo(data) {
  data.iconFailures = "icon-ok";
  data.iconChanges = "icon-minus";
  if (data.fields.metrics.resources.Failed > 0) { 
    data.hadFailures = "hadFailures";
    data.iconFailures = "icon-remove";
  }
  if (!data.fields.metrics.events.Noop || data.fields.metrics.events.Noop < 1) { 
    data.hadChanges = "hadChanges";
    data.iconChanges = "icon-exclamation-sign";
  }
}
