// Make sure to include the `ui.router` module as a dependency.
angular.module('app')
  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {   
        $urlRouterProvider
          .otherwise('/');
        $stateProvider
      	  .state('map', {
      	      url:'/{mapId:[0-9]{1,4}}',
              templateUrl:'/js/partials/Map.html',
              /*templateUrl:'/js/partials/SpotNewFormButton.html',*/
              controller: 'MapController'
      	  })
      	  .state('map.new', {
      	      url: '/new',
      	      templateUrl:'/js/partials/SpotNewForm.html',
              controller: 'NewSpotController'
      	  });
      }
    ]
  );


