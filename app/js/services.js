'use strict';

/* Services */
angular.module('normanServices', []).
    service('ESHelpers', function(){
      this.elasticsearch_url = function() { // Sniff if we're being run as an elasticsearch plugin
        var location = window.location;
        if (/_plugin/.test(location.href.toString())) {
          var trimmed = /.*\/_plugin\//.exec(location.href.toString());
          return trimmed[0].replace("/_plugin/", "/");
        }
        return "/es"
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