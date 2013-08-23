var app = angular.module('app',[]);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/map/spot/new',
              {
                  controller: 'SpotController',
                  templateUrl: '/app/partials/SpotNewForm.html'
              })

        .when('/map/spot/:spotID',
              {
                  controller: 'SpotController',
                  templateUrl: '/app/partials/Spot.html'
              })
        .when('/map',
              {
                  controller: 'MapController',
                  templateUrl: '/app/partials/SpotsList.html'
              })
        .otherwise({ redirectTo: '/map' });
});

