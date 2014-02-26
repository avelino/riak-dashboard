'use strict';

angular.module('riakDashboardApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/bucket/:slug', {
        templateUrl: 'views/bucket_list.html',
        controller: 'BucketListCtrl'
      })
      .when('/bucket', {
        templateUrl: 'views/bucket.html',
        controller: 'BucketCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
