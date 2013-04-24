'use strict';

/* Services */
angular.module('normanServices', []).
    service('ESHelpers', function($http) {
      this.elasticsearch_url = function() { // Sniff if we're being run as an elasticsearch plugin
        var location = window.location;
        if (/_plugin/.test(location.href.toString())) {
          var trimmed = /.*\/_plugin\//.exec(location.href.toString());
          return trimmed[0].replace("/_plugin/", "");
        }
        return "/es"
      };
      this.addContextTo = function(data) {
        data.iconFailures = "icon-ok";
        data.iconChanges = "icon-minus";
        if (data.fields.metrics.resources) {
          if (data.fields.metrics.resources.Failed > 0) {
            data.iconFailures = "icon-remove";
          }
          if (!data.fields.metrics.events.Noop || data.fields.metrics.events.Noop < 1) {
            data.iconChanges = "icon-exclamation-sign";
          }
        }
        else {
          data.iconFailures = "icon-remove";
          data.iconChanges = "icon-exclamation-sign";
        }
        return data;
      };
      this.cleanData = function(data) {
        var out = {};
        for (var key in data) {
          var newKey = key.replace(/@/g, "");
          out[newKey] = data[key];
        }
        return out;
      }
});
/*
angular.module('normanServices', ['$http']).
    factory('Phone', function(){
  return {"call": function () { alert('foo2') } };
});*/

/*app.service('nametrickService', function() {
  this.reverse = function(name) {
    return name.split("").reverse().join("");
  };
});*/
