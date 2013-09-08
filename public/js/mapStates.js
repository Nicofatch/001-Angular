// Make sure to include the `ui.router` module as a dependency.
angular.module('app')
  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {   
        $urlRouterProvider
          .otherwise('/');
        $stateProvider
      	  .state('map', {
      	      url:'/',
              templateUrl:'js/partials/SpotNewFormButton.html'
      	  })
      	  .state('new', {
      	      url: '/new',
      	      templateUrl:'js/partials/SpotNewForm.html',
              controller: 'NewSpotController'
      	  })
      }
    ]
  );


