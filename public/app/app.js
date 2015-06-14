/**
* lifeApp Module
*
* Description
*/
var lifeApp = angular.module('life_App', ['ngRoute', 'ngSanitize', 'chart.js'])
.config(['$routeProvider',function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: './app/user.html',
		controller: 'HomeController'
	});

    $routeProvider.when('/life/:userId/:section?', {
		templateUrl: './app/life.html',
		controller: 'LifeController'
	});

}]);
