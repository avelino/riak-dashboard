'use strict';

var JSONP_RESOURCE = function($resource, URL){
  return $resource(URL, {}, {
    jsonp: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', buckets: true}},
    delete: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', buckets: true}}
  });
}

angular.module('riakDashboardApp')
  .controller('BucketCtrl', ['$scope', '$http', '$resource', function ($scope, $http, $resource) {
    JSONP_RESOURCE($resource, 'http://127.0.0.1:8889/buckets')
    .jsonp(function(b){
      $scope.buckets = b.buckets;
    });

    $scope.bucket_reset = function (bucket) {
      JSONP_RESOURCE($resource, 'http://127.0.0.1:8889/buckets/'+ bucket +'/props')
      .delete(function(b){
        console.log(b)
      });
    };

    $scope.bucket_delete = function (bucket) {
    };

    $scope.menu_bucket = true;
  }]);
