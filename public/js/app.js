'use strict'

var app = angular.module("prototypeApp" , [ 
	'ngAnimate',
	'toastr',
	'ngResource',
	'firebase',
	'ngRoute',
	'ngStorage',
	'angularUtils.directives.dirPagination'
])
.constant('FBURL' , 'https://angular-adf7f.firebaseio.com/')
.config(function ($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/dashboard.html',
			controller: 'userCtrl'
		})
		.when('/dashboard',{
			resolve: {
				"check": function($location, $rootScope){
					if(!$rootScope.loggedIn){
						$location.path('/');
					}
				}
			},
			templateUrl: 'views/dashboard.html',
			controller: 'CategoryCtrl'
		})
		.when('/products',{
			templateUrl: 'views/products.html',
			controller: 'InventoryCtrl'
		})
		.when('/cellars',{
			templateUrl: 'views/cellars.html',
			controller: 'InventoryCtrl'
		})
		.when('/providers',{
			templateUrl: 'views/providers.html',
			controller: 'InventoryCtrl'
		})
		.when('/reports',{
			templateUrl: 'views/reports.html',
			controller: 'reportCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

