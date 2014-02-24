'use strict';

angular.module('riakDashboardApp')
  .factory('Bucket', ['$resource', function($resource) {
    return $resource('http://127.0.0.1:8889/buckets', {}, {
      get: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', buckets: true}}
    });
  }])

  .controller('MainCtrl', ['$scope', '$http', 'Bucket', function ($scope, $http, Bucket) {

    var lerolero = Bucket.get();
    console.log(lerolero)

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
