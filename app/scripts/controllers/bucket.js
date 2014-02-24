'use strict';

angular.module('riakDashboardApp')
  .factory('Bucket', ['$resource', function($resource) {
    return $resource('http://127.0.0.1:8889/buckets', {}, {
      jsonp: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', buckets: true}}
    });
  }])

  .controller('BucketCtrl', ['$scope', 'Bucket', function ($scope, Bucket) {
    Bucket.jsonp(function(b){
      $scope.buckets = b.buckets;
    });
    $scope.menu_bucket = true;
  }]);
