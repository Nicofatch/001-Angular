//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('MapController', function ($rootScope, $scope, $state, mapService, $stateParams) {

    $rootScope.map = {};
    $scope.selectedSpot = {};

    init();

    function init() {
        console.log('MapController - init');
        spotMap.clear();
        //$scope.spots = mapService.getSpots();
        mapService.getMap($stateParams.mapId).then(function(data) {
            $rootScope.map = data;
        });
    }

    $scope.tagClass = function(id) {
        switch(id % 5) {
            case 0:
                return "label label-primary";
            case 3:
                return "label label-info";
            case 1:
                return "label label-success";
            case 2:
                return "label label-warning";
            case 4:
                return "label label-danger";
        }
    }

    $scope.deleteTag = function(tag) {
        // Remove tag from tag array
        var index = $rootScope.map.tags.indexOf(tag);
        $rootScope.map.tags.splice(index, 1);
        // Update map
        mapService.updateMap($rootScope.map).then(function(data) {
            $rootScope.map = data;
        });
    }

    $scope.selectSpot = function (spot) {   	
	   // Unselect current spot
	   $scope.unselectSpot();
	   // Select new spot
	   $scope.selectedSpot = spot;
	   //$scope.selectedSpot.class = 'active';
    }

    $scope.$watch('selectedSpot',function() {
    	if ($scope.selectedSpot._id)
         spotMap.focusOnMarker($scope.selectedSpot._id);
    });

    /* TODO */
    $scope.$watch('map.spots.length', function() {
        if (typeof $rootScope.map.spots != "undefined")
            $rootScope.map.spots.sort(function(a,b){return b._id-a._id});
    });

    $scope.unselectSpot = function () {
    	//$scope.selectedSpot.class = '';
    	$scope.selectedSpot = '';
    }
});
