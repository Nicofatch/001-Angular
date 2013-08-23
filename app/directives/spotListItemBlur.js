/*global todomvc */
'use strict';

/**
* Directive that executes an expression when the element it is applied to loses focus
*/
todomvc.directive('spotListItemBlur', function () {
    return function (scope, elem, attrs) {
	elem.bind('blur', function () {
	    scope.$apply(attrs.spotListItemBlur);
	});
    };
});
