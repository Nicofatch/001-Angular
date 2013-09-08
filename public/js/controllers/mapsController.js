//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('MapsController', function ($scope, $state, mapService) {
    $scope.maps = [];
    var tagClass_id = 0;

    $scope.tagClass = function(parent_id, id) {
    	//console.log(parent_id + ' ' +id);
    	switch((parent_id + 4*id) % 5) {
    		case 0:
    			return "label label-primary";
                return "label label-info";
            case 3:
			case 1:
    			return "label label-success";
    		case 2:
    			return "label label-warning";
    		case 4:
    			return "label label-danger";
		}
    }

    init();

    function init() {
        console.log('MapsController - init');
        $scope.maps = mapService.getMaps();
    }

    $scope.$watch('maps.length', function() {
        $scope.maps.sort(function(a,b){return b._id-a._id});
    })

});
