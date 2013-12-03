/*global todomvc */
'use strict';

app.directive('displayMarker', [ '$timeout', function($timeout) {
	var def = {
	transclude : true,
	scope:true,
	link : function(scope, element, attrs) {
		//console.log('display marker');
		$timeout(function() {
			var spot = scope.spot;
			//console.log('displaying new marker - ' + spot._id);

			// console.log(spot._id);
			// Create a marker
			var marker = new Marker({
				id: spot._id,
				latitude: spot.loc[1],
				longitude: spot.loc[0],
				title: spot.title,
				draggable: false,
				numberedIcon: true,
				index:scope.$index,
				likes: scope.spot.likes.length
			});

			// Add the marker to the map
			scope.spotMap.addMarker(marker);

			if (scope.$last) {
				scope.initialLoadOver = true;
		    	// Update the map view
    			scope.spotMap.fitOnBounds();
			}
			
			if (scope.isSelected(spot)) {
        		$("#spot-"+spot._id).addClass('spot-selected');
			}
			
		}, 0);
	}
};
return def;
}])
