/*global todomvc */
'use strict';

app.directive('selectMarker', [ '$timeout', function($timeout) {
    var def = {
	// Terminal : true indicates that this directive will be the last executed
	terminal : true,
	transclude : true,
	link : function(scope, element, attrs) {
            $timeout(function() {
		console.log('select-marker');
	    }, 0);
	}
    };
    return def;
}])
