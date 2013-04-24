'use strict';

/* Filters */
angular.module('normanFilters', []).
    filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    }).
    filter('iso8601ago', function () {
        return function (text) {
          return moment(text).fromNow();
        }
    });

