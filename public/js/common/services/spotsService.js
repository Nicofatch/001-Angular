app.service('spotsService', function ($http,appSettings) {

  this.getSpot = function (id) {
    return $http({method: 'GET', url: appSettings.apiServer + appSettings.apiUri + '/spots/'+id}).then(function(result) {
      return result.data;
    });
  };


  this.searchSpots = function(options) {
    return $http({method: 'GET', url: appSettings.apiServer + appSettings.apiUri + '/spots/'+options.k+'/'+options.lng+'/'+options.lat}).then(function(result) {
      return result.data;
    });
  };

  this.updateSpot = function (spot) {
    var spot_id = spot._id;
    delete spot._id;
    return $http({method: 'PUT', url: appSettings.apiServer + appSettings.apiUri + '/spots/'+spot_id, data:spot}).then(function(result) {
      return result.data;
    });
  };

});