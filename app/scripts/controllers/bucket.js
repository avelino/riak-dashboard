'use strict';

angular.module('riakDashboardApp')
  .factory('$jsonp', ['$resource', function($resource){
    return function(URL){
      return $resource(URL, {}, {
        jsonp: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', _method: 'get'}},
        delete: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', _method: 'delete'}}
      });
    };
  }])

  .controller('BucketCtrl', ['$scope', '$http', '$jsonp', function ($scope, $http, $jsonp) {
    $jsonp('http://127.0.0.1:8889/buckets?buckets=true').jsonp(function(b){
      $scope.buckets = b.buckets;
    });

    $scope.bucket_reset = function (bucket) {
      $jsonp('http://127.0.0.1:8889/buckets/'+ bucket +'/props').delete();
    };

    $scope.bucket_delete = function (bucket) {
      $jsonp('http://127.0.0.1:8889/buckets/'+ bucket +'/keys?keys=true')
        .jsonp(function(b){
          for (var i in b.keys){
            console.log(b.keys[i])
            $jsonp('http://127.0.0.1:8889/buckets/'+ bucket +'/keys/'+ b.keys[i])
            .delete();
          };
          $scope.buckets.splice($scope.buckets.indexOf(b), 1)
        });
    };

    $scope.menu_bucket = true;
  }])

  .controller('BucketListCtrl', ['$scope', '$jsonp', '$routeParams', '$jsonp', function ($scope, $jsonp, $routeParams) {
    var slug = $routeParams.slug;

    $jsonp('http://127.0.0.1:8889/buckets/'+ slug +'/keys?keys=true')
      .jsonp(function(b){
        $scope.keys = b.keys;
      });

    $scope.bucket_delete = function (key) {
      $jsonp('http://127.0.0.1:8889/buckets/'+ slug +'/keys/'+ key).delete();
      $scope.keys.splice($scope.keys.indexOf(key), 1)
    };

    $scope.menu_bucket = true;
  }]);
