/*global todomvc */
'use strict';

app.directive('displayMarkers', [ '$timeout', function($timeout) {
    var def = {
	// Terminal : true indicates that this directive will be the last executed
	terminal : true,
	transclude : true,
	link : function(scope, element, attrs) {
            $timeout(function() {
		// Reset all markers
		spotMap.clear();
		for (var ii=0, ll=scope.spots.length;ii<ll;ii++) {
		    var spot = scope.spots[ii];
		    // Create a marker
		    var marker = Object.create(Marker, {
			id: { value: spot._id },
			latitude: { value: spot.latitude },
			longitude: { value: spot.longitude },
			title: { value: spot.title }
		    });
		    marker._init();
		    // Add the marker to the map
		    spotMap.addMarker(marker);    
		    
		}
		// Update the map view
		spotMap.fitOnBounds();
	    }, 0);
	}
    };
    return def;
}])
