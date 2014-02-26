'use strict';

var JSONP_RESOURCE = function($resource, URL){
  return $resource(URL, {}, {
    jsonp: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', _method: 'get'}},
    delete: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', _method: 'delete'}}
  });
}

angular.module('riakDashboardApp')
  .controller('BucketCtrl', ['$scope', '$http', '$resource', function ($scope, $http, $resource) {
    JSONP_RESOURCE($resource, 'http://127.0.0.1:8889/buckets?buckets=true')
    .jsonp(function(b){
      $scope.buckets = b.buckets;
    });

    $scope.bucket_reset = function (bucket) {
      JSONP_RESOURCE($resource, 'http://127.0.0.1:8889/buckets/'+ bucket +'/props')
      .delete();
    };

    $scope.bucket_delete = function (bucket) {
    };

    $scope.menu_bucket = true;
  }])

  .controller('BucketListCtrl', ['$scope', '$resource', '$routeParams', '$timeout', function ($scope, $resource, $routeParams, $timeout) {
    var slug = $routeParams.slug;
    JSONP_RESOURCE($resource, 'http://127.0.0.1:8889/buckets/'+ slug +'/keys?keys=true')
      .jsonp(function(b){
        $scope.keys = b.keys;
    });

    $scope.bucket_delete = function (key) {
      JSONP_RESOURCE($resource, 'http://127.0.0.1:8889/buckets/'+ slug +'/keys/'+ key)
      .delete();
      $scope.keys.splice($scope.keys.indexOf(key), 1)
    };

    $scope.menu_bucket = true;
  }]);
