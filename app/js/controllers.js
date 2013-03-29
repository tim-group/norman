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
  $http.post('/es/_all/puppet-apply/_search', angular.toJson({
   "from" : 0, "size" : 100,
   "query": {
      "term": {
         "@tags": "puppet-apply"
      }
   },
   "sort" : [
        { "@timestamp" : {"order" : "desc"} }
   ]
})).success(function(data) {
    var d = []
    data['hits']['hits'].forEach(function(hit) {
        hit["_source"]["uuid"] = hit["_index"].concat("/").concat(hit["_id"]);
        d.push(addContextTo(cleanData(hit["_source"])));
    })
    $scope.reports = d;
  });

  $scope.orderProp = '-timestamp';
}

//ReportListCtrl.$inject = ['$scope', '$http'];

function ReportDetailCtrl($scope, $routeParams, $http) {
  $scope.uuid = $routeParams.uuid;
  $http.get('/es/' + $routeParams.index + '/puppet-apply/' + $routeParams.uuid).success(function(data) {
    $scope.report = addContextTo(cleanData(data["_source"]));
  });
}

//ReportDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];

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
  return data;
}

