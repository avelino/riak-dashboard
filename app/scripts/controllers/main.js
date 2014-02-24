'use strict';

angular.module('riakDashboardApp')
  .factory('Bucket', ['$resource', function($resource) {
    return $resource('http://127.0.0.1:8098/buckets', {}, {
      get: {method: 'JSONP', params: {buckets: true}, headers: {'Content-Type': 'application/json'}}
    });
  }])

  .controller('MainCtrl', ['$scope', 'Bucket', function ($scope, Bucket) {

    var lerolero = Bucket.get();
    console.log(lerolero)

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
