'use strict';

angular.module('riakDashboardApp')
  .controller('MainCtrl', ['$scope', 'Bucket', function ($scope, Bucket) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
