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
  }])

  .factory('$jsonp', ['$resource', function($resource){
    return function(URL){
      return $resource("http://"+ location.host.split(':')[0] +":8889"+ URL, {}, {
        jsonp: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', _method: 'get'}},
        delete: {method: 'JSONP', params: {callback: 'JSON_CALLBACK', _method: 'delete'}}
      });
    };
  }])

  .run(function($rootScope, $jsonp){

    $jsonp('/ping')
      .jsonp(function(p){
        $rootScope.ping = p.ping;
      });
  });
