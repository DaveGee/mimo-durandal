'use strict';

angular.module('myApp.year', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/year', {
    templateUrl: 'year/year.html',
    controller: 'YearCtrl'
  });

}])

.controller('YearCtrl', [function() {

}]);
