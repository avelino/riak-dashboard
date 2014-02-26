'use strict';

angular.module('riakDashboardApp')
  .controller('MainCtrl', ['$scope', '$jsonp', function ($scope, $jsonp) {

    $jsonp('/stats')
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
