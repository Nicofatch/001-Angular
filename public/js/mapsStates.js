// Make sure to include the `ui.router` module as a dependency.
angular.module('app')
  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {   
        $urlRouterProvider
          .otherwise('/');

        $stateProvider
      	  .state('home', {
      	      url:'/',
      	      template:''
      	  })
      }
    ]
  );


