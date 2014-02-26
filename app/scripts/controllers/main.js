'use strict';

angular.module('riakDashboardApp')
  .controller('MainCtrl', ['$scope', '$jsonp', function ($scope, $jsonp) {

    $jsonp('http://127.0.0.1:8889/stats')
      .jsonp(function(s){
        $scope.stats = s;
      });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.menu_home = true;
  }]);
