'use strict';

angular.module('myApp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/year', {
    templateUrl: 'app/year/year.html',
    controller: 'YearCtrl'
  });

}])

.controller('YearCtrl', [function() {

}]);
