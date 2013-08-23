//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('MapController', function ($scope, mapService) {
    
    $scope.spots = {};
    
    $scope.selectedSpot = {};

    init();

    function init() {
        $scope.spots = mapService.getSpots();
    }

    $scope.insertSpot = function () {
        var title = $scope.newSpot.title;
        var description = $scope.newSpot.description;
        mapService.insertSpot(title, decription);
        /*$scope.newCustomer.firstName = '';
        $scope.newCustomer.lastName = '';
        $scope.newCustomer.city = '';*/
	
	// Todo : redirect to spot/:id route
    };

    $scope.selectSpot = function (spot) {
	
	$scope.selectedSpot.class = '';
	//selectedSpot = $scope.spots[id];
	$scope.selectedSpot = spot;
	$scope.selectedSpot.class = 'active';
    };

    $scope.$watch('selectedSpot',function() {
	if ($scope.selectedSpot._id)
	    spotMap.focusOnMarker($scope.selectedSpot._id);
    });
});
