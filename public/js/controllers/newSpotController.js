//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('NewSpotController', function ($scope, $state, mapService) {
     init();

    function init() {
        console.log('NewSpotController - init');
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
	   $state.go('map');
    };
});
