var trip=angular.module("trip",[]);

trip.controller("tripctrl",['$scope','$dataservice','$routeParams',function($scope,$dataservice,$routeParams){

	$scope.from=$dataservice['from'];
	$scope.to=$dataservice['to'];	
	$scope.leavedate=$dataservice['leavedate'];
	$scope.arrivaldate=$dataservice['arrivaldate'];

	

	$scope.clear=function() {

	};	

	$scope.isRoundTrip=function() {
		return $routeParams['triptype'] != "single";	
	};

	$scope.submit=function (){
		//validate fields
		if(!$scope.isRoundTrip() && $scope.from && $scope.to && $scope.leavedate) {
			alert("Please fill out all fields");
		} else if($scope.isRoundTrip() && $scope.from && $scope.to && $scope.leavedate && $scope.arrivaldate) {
			alert("Please fill out all fields");
		
		}
	
		alert($scope.from);

	 	$dataservice['from']=$scope.from;
		$dataservice['to']=$scope.to;	
		$dataservice['leavedate']=$scope.leavedate;
		$dataservice['arrivaldate']=$scope.arrivaldate;     
		
		$scope.queryResult();
		
	};
}]);
