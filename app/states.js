// Make sure to include the `ui.router` module as a dependency.
angular.module('app')
  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////

        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider

          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
          .otherwise('/map');
	  

	 

        //////////////////////////
        // State Configurations //
        //////////////////////////

        // Use $stateProvider to configure your states.
        $stateProvider
	  
	  .state('home', {

	      url:'/',
	      template:''
	  })
	  
          //////////////
          // Map //
          //////////////

          .state('map', {

            url: '/map',

            templateUrl: 'app/partials/SpotsList.html',

            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. In this case, since contacts
            // returns a promise, the controller will wait until contacts.all() is
            // resolved before instantiation. Non-promise return values are considered
            // to be resolved immediately.
            /*resolve: {
              spots: ['spots',
                function( spots){
                  return spots.all();
                }]
            },*/

            // You can pair a controller to your template. There *must* be a template to pair with.
            //controller: ['$scope', '$state', 'mapService', 'MapController']
	    controller: 'MapController'
          })

	  .state('map/spot/new', {
	      
	      url: '/spot/new',
	      parent:'map',
	      templateUrl:'app/partials/SpotNewForm.html',
	      controller: 'MapController'      

	  })
      }]);


