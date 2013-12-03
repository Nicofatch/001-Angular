//This controller retrieves data from the mapService and associates it with the $scope
//The $scope is ultimately bound to the map view
angular.module('spot')
.config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {   
        $urlRouterProvider
          .otherwise('/');
        $stateProvider
          .state('spot', {
              url:'/:id',
              templateUrl:'/js/app/spot/spot.tpl.html',
              controller: 'SpotController'
          })
      }
    ]
  )
.controller('SpotController', function ($scope, $state, spotsService, utilsService, $stateParams) {

    $scope.spot = {};

    init();

    function init() {
        console.log('SpotController - init');
        
        $scope.spot = spotsService.getSpot($stateParams.id).then(function(data){
            $scope.spot = data;
        });
    }
});
