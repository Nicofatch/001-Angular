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
              templateUrl:'/js/partials/Maps.html',
              controller: 'MapsController'
          })
          .state('maps.new', {  
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
          })
          .state('map', {
              url:'/:mapId',
              templateUrl:'/js/partials/FullMap.html',
              controller: 'MapController'
          })
          .state('map.info', {
              url: '/info',
              views: {
                'main': {
                  templateUrl: '/js/partials/MapInfo.html'
                }
              }              
          })
          .state('map.new', {
              url: '/new',
              views: {
                'newSpot': {
                  templateUrl: '/js/partials/SpotNewForm.html',
                  controller: 'NewSpotController'
                }
              }              
          })
          .state('map.tags', {
              url: '/tags',
              views: {
                // So this one is targeting the unnamed view within the parent state's template.
                'newTags': {
                  templateUrl: '/js/partials/TagsNewForm.html',
                  controller: 'NewTagsController'
                }
              }
          });

      }
    ]
  );


