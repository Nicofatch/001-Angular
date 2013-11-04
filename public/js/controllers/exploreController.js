//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('ExploreController', function ($rootScope, $scope, $state, spotsService, utilsService, $stateParams, $location) {

    $rootScope.spots = {};
    $scope.selectedSpot = {};

    init();

    function init() {
        console.log('ExploreController - init');
        // Get explore params: keywords & location
        var exploreParams = utilsService.getQueryStringParams($location.absUrl());
        if (exploreParams['k'])
            $scope.k = decodeURIComponent(exploreParams['k'][0]).replace('+',' ');
        if (exploreParams['l'])
            $scope.l = decodeURIComponent(exploreParams['l'][0]).replace('+',' ');
        if (exploreParams['lat'])
            $scope.lat = exploreParams['lat'][0];
        if (exploreParams['lng'])
            $scope.lng = exploreParams['lng'][0];

        $("#k-xs").val($scope.k);
        $("#l-xs").val($scope.l);

        $("#k").val($scope.k);
        $("#l").val($scope.l);

        spotMap.clear();

        spotsService.searchSpots({lat:$scope.lat,lng:$scope.lng}).then(function(data){
            $scope.spots = data;
        });
    }

    $scope.toggleSpotMenu = function(id) {
        $('#spotMenu'+id).toggle();
    }

    $scope.selectSpot = function (id) {   	
	   // Unselect current spot
	   $scope.unselectSpot();
       
       $scope.toggleSpotMenu(id); 
	   // Select new spot
	   for (var i=0,l=$scope.spots.length;i<l;i++) {
            if ($scope.spots[i]._id == id) {
                $scope.selectedSpot = $scope.spots[i];
                break;
            }
        }
	   //$scope.selectedSpot.class = 'active';
    }


    /* TODO C'est fatch */
    $scope.$watch('selectedSpot',function() {
        if ($scope.selectedSpot._id)
         spotMap.focusOnMarker($scope.selectedSpot._id);
    });

    $scope.unselectSpot = function () {
        $scope.toggleSpotMenu($scope.selectedSpot._id);
    	//$scope.selectedSpot.class = '';
    	$scope.selectedSpot = '';
    }
});
