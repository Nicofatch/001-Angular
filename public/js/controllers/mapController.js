//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('MapController', function ($scope, $state, mapService) {

    $scope.spots = [];
    
    $scope.selectedSpot = {};

    init();

    function init() {
        console.log('MapController - init');
        $scope.spots = mapService.getSpots();
    }

    $scope.selectSpot = function (spot) {
	
	   // Unselect current spot
	   $scope.unselectSpot();
	   // Select new spot
	   $scope.selectedSpot = spot;
	   //$scope.selectedSpot.class = 'active';
    };

    $scope.$watch('selectedSpot',function() {
    	if ($scope.selectedSpot._id)
         spotMap.focusOnMarker($scope.selectedSpot._id);
    });

    $scope.$watch('spots.length', function() {
        $scope.spots.sort(function(a,b){return b._id-a._id});
    })

    $scope.unselectSpot = function () {
    	//$scope.selectedSpot.class = '';
    	$scope.selectedSpot = '';
    }
});
