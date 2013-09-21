//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
app.controller('NewTagsController', function ($rootScope, $scope, $state, mapService, $stateParams) {
    init();

    function init() {
        console.log('NewTagsController - init');
    }
    $scope.insertTags = function () {
        var tags = $scope.newTags;
        for (var i=0, l=tags.length;i<l;i++) {
            if ($rootScope.map.tags.indexOf(tags[i]) < 0)
                $rootScope.map.tags.push(tags[i]);
        }
        
        mapService.updateMap($rootScope.map).then(function(data) {
            $rootScope.map = data;
        });

	    // Redirect to parent (map)
	    $state.go('map');
    };
});
