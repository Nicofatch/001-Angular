var app = angular.module('app',["ui.router","ui.utils"]).run(
    [ '$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          // It's very handy to add references to $state and $stateParams to the $rootScope
          // so that you can access them from any scope within your applications.For example,
          // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
          // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);

//This configures the routes and associates each route with a view and a controller
/*app.config(function ($routeProvider) {
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
});*/

