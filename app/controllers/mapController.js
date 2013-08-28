//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('MapController', function ($scope, $state, mapService) {
    
    $scope.spots = {};
    
    $scope.selectedSpot = {};

    init();

    function init() {
        console.log('init');
	$scope.spots = mapService.getSpots();
    }

    $scope.insertSpot = function () {
        
	var title = $scope.newSpot.title;
        //var description = $scope.newSpot.description;

	var spot = mapService.insertSpot({
            title: title,
            description: '',
            longitude: spotMap.geoPosition.marker.LMarker._latlng.lng,
            latitude: spotMap.geoPosition.marker.LMarker._latlng.lat
        });
        
	// Remove the geo marker
        spotMap.removeGeoMarker();
	
	// Adjust the map
	spotMap.fitOnBounds();
	
	// Redirect to parent (map)
	$state.go('^');
    };

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
    
    $scope.unselectSpot = function () {
	//$scope.selectedSpot.class = '';
	$scope.selectedSpot = '';
    }
});
