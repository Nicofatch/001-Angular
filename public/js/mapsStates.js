// Make sure to include the `ui.router` module as a dependency.
angular.module('app')
  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {   
        $urlRouterProvider
          .otherwise('/');

        $stateProvider
          .state('maps', {
              url:'/',
              views: {
                'newMapForm': {
                  template:''
                }
              }
          })
          .state('new', {
              url: '/new',
              views: {
                // So this one is targeting the unnamed view within the parent state's template.
                'newMapButton': {
                  template: ''
                },
                'newMapForm': {
                  templateUrl:'/js/partials/MapNewForm.html',
                  controller: 'NewMapController'
                }
              }
          });
      }
    ]
  );


