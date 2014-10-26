
var main=angular.module("travel",["ngRoute","home","trip"]);

main.config(function($routeProvider) {
	$routeProvider.when('/home',{
		templateUrl: 'home.html',
		controller: 'homectrl'

	}).when('/home/:triptype',{
	//Single Trip and round trip
		templateUrl: 'trip.html',	
		controller: "tripctrl"
			
	}).when('/about',{
	//About Tab
	

	
	}).otherwise({
		redirectTo:'/home'	
		
	});
		
		
});

main.controller("mainctrl",['$scope','$routeParams','$dataservice',function($scope,$routeParams,$dataservice) {
	$scope.state='home';

	$scope.isActive=function(tab) {
		return tab==$scope.state;	

	};

	$scope.switchstate=function(state) {
		$scope.state=state;
		
	};

	$scope.results={walk:[],
			drive:[],
			transit:[],
			flight:[]};
	$scope.queryResult=function() {
		console.log($dataservice['from']);
		
		console.log($dataservice['to']);


		$scope.results=calcRoute($dataservice['from'],$dataservice['to']);

	};
}]);

//Vars that are part of the data service
var dataservice={};

//service that allows for synchronized connection between all the modules
main.factory('$dataservice',function() {
	
	return dataservice;

});
