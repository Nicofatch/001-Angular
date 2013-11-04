app.service('spotsService', function ($http) {

  this.getSpots = function() {
    return $http({method: 'GET', url: 'http://192.168.137.10:5000/API/spots/rando/toulouse'}).then(function(result) {
      return result.data;
    });
  };

  this.searchSpots = function(options) {
    return $http({method: 'GET', url: 'http://192.168.137.10:5000/API/spots/'+options.lng+'/'+options.lat}).then(function(result) {
      return result.data;
    });
  };

});