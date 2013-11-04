// Make sure to include the `ui.router` module as a dependency.
angular.module('app')
  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {   
        $urlRouterProvider
          .otherwise('/');
        $stateProvider
          .state('explore', {
              url:'/',
              templateUrl:'/js/partials/explore.html',
              controller: 'ExploreController'
          });
      }
    ]
  );


