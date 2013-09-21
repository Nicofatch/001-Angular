/*global todomvc */
'use strict';

app.directive('displayMarker', [ '$timeout', function($timeout) {
	var def = {
	// Terminal : true indicates that this directive will be the last executed
	//terminal : true,
	transclude : true,
	link : function(scope, element, attrs) {
		//console.log('display marker');
		$timeout(function() {
			var spot = scope.spot;

			// console.log(spot._id);
			// Create a marker
			var marker = new Marker({
				id: spot._id,
				latitude: spot.latitude,
				longitude: spot.longitude,
				title: spot.title,
				draggable: false
			});

			// Add the marker to the map
			spotMap.addMarker(marker);

			if (scope.$last) {
		    	// Update the map view
		    	spotMap.fitOnBounds();
			}
		}, 0);
	}
};
return def;
}])
