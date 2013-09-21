//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('NewSpotController', function ($rootScope, $scope, $state, mapService, $stateParams) {
    init();
    function init() {
        console.log('NewSpotController - init');
        $scope.locationGeo = 'geo';
        $scope.locationAddress = 'address';
        $scope.locationType = $scope.locationGeo;
    }
    $scope.insertSpot = function () {
        var spot = {
            _id: $rootScope.map.spots.length + 1,
            title: $scope.newSpot.title,
            description: $scope.newSpot.description,
            longitude: spotMap.geoPosition.marker.LMarker._latlng.lng,
            latitude: spotMap.geoPosition.marker.LMarker._latlng.lat
        };

        $rootScope.map.spots.splice(0,0,spot);
            mapService.updateMap($rootScope.map).then(function(data) {
            $rootScope.map = data;
        });
	    // Remove the geo marker
        spotMap.removeGeoMarker();

        // Adjust the map
        spotMap.fitOnBounds();

	    // Redirect to parent (map)
	    $state.go('map');
    };

    $scope.switchLocationType = function(type) {
        $scope.locationType = type;
        if ($scope.locationType == $scope.locationGeo) {
            $('#newSpotLocationAddressContainer').hide();
            $('#newSpotTitle').focus();
        } else {
            $('#newSpotLocationAddressContainer').show();
            $('#newSpotLocationAddress').focus();
        }
    }
});
