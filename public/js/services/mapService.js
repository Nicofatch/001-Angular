app.service('mapService', function () {

  this.getMaps = function () {
    return maps;
  };

  this.getMap = function (id) {
    for (var i = 0, l = maps.length; i<l ; i++) {
      if (maps[i]._id === id) {
        return maps[i];
      }
    }
    return null;
  };

  this.insertSpot = function (options) {
    var mapId = options.mapId;
    var map = this.getMap(mapId);

    var topID = map.spots.length + 1;

    map.spots.push({
      _id: topID,
      title: options.title ,
      description: options.description ,
      longitude: options.longitude,
      latitude: options.latitude
    });
    return map.spots[topID];
  };  

  this.insertMap = function (options) {
    var topID = maps.length + 1;
    maps.push({
      _id: topID,
      title: options.title ,
      description: options.description ,
      tags: options.tags || '',
      contributors_count: options.contributors_count || '1',
      markers_count: options.markers_count || '0'
    });
    return maps[topID];
  };

  var spots = [
  {
    "title": "paintball75",
    "description": "Un super terrain de paintball",
    "sports": "paintball",
    "longitude": 2.340841,
    "latitude": 48.8650429,
    "_id": "1"
  },
  {
    "title": "cinema de suresnes",
    "description": "Le meilleur cinema du grand Ouest",
    "sports": "cinema",
    "longitude": 2.242201,
    "latitude": 48.8649466,
    "_id": "2"
  },
  {
    "title": "bowling du chaton",
    "description": "Le meilleur bowling pour chats",
    "sports": "bowling",
    "longitude": 2.302201,
    "latitude": 48.9649466,
    "_id": "3"
  }
  ];

  var maps = [
  {
    "title": "Les bars à chat de Paris",
    "description": "Carte des meilleurs bars parisiens dans lesquels votre minou sera chouchouté",
    "tags": ['bar','chat','paris'],
    "contributors_count": "12",
    "markers_count": "63",
    "_id": "1",
    "spots": spots
  },
  {
    "title": "Les hotels à chat",
    "description": "Carte des meilleurs hotels pour chat",
    "tags": ['chat','hotel'],
    "contributors_count": "4",
    "markers_count": "15",
    "_id": "2",
    "spots": []
  },
  {
    "title": "Les plus beau chats",
    "description": "Spottez votre chat. Trop mignon !!",
    "tags": ['beauté','chat','mignon', 'grraou'],
    "contributors_count": "1274",
    "markers_count": "1274",
    "_id": "3",
    "spots": spots
  },
  {
    "title": "Les plus beau chiens",
    "description": "Spottez votre chien. Trop mignon !!",
    "tags": ['beauté','chien','mignon'],
    "contributors_count": "643",
    "markers_count": "643",
    "_id": "4",
    "spots": spots
  }];

});



/*    this.deleteCustomer = function (id) {
        for (var i = customers.length - 1; i >= 0; i--) {
            if (customers[i].id === id) {
                customers.splice(i, 1);
                break;
            }
        }
      }; */