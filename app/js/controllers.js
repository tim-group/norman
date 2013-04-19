'use strict';

/* Controllers */

function ReportListCtrl($scope, $http, ESHelpers) {
  $http.post(ESHelpers.elasticsearch_url() + '/_all/puppet-apply/_search', angular.toJson({
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
        d.push(ESHelpers.addContextTo(ESHelpers.cleanData(hit["_source"])));
    })
    $scope.reports = d;
  });

  $scope.orderProp = '-timestamp';
}

//ReportListCtrl.$inject = ['$scope', '$http', 'ESHelpers'];

function ReportDetailCtrl($scope, $routeParams, $http, ESHelpers) {
  $scope.uuid = $routeParams.uuid;
  $http.get(ESHelpers.elasticsearch_url() + '/' + $routeParams.index + '/puppet-apply/' + $routeParams.uuid).success(function(data) {
    $scope.report = ESHelpers.addContextTo(ESHelpers.cleanData(data["_source"]));
  });
}

//ReportDetailCtrl.$inject = ['$scope', '$routeParams', '$http', 'ESHelpers'];

