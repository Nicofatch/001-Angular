//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('NewMapController', function ($scope, $state, mapService) {
     init();

    function init() {
        console.log('NewMapController - init');
    }
    $scope.insertMap = function () {
       var title = $scope.newMap.title;
       var description = $scope.newMap.description;
       var tags = $scope.newMap.tags;
       //var description = $scope.newSpot.description;

       var spot = mapService.insertMap({
            title: title,
            description: description,
            tags:tags
       });
        
	   // Redirect to parent (map)
	   $state.go('maps');
    };
});
