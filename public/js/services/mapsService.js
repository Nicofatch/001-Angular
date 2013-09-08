app.service('mapsService', function () {
    this.getMaps = function () {
	return maps;
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

    /*  this.deleteCustomer = function (id) {
        for (var i = customers.length - 1; i >= 0; i--) {
            if (customers[i].id === id) {
                customers.splice(i, 1);
                break;
            }
        }
    }; */

    this.getMap = function (id) {
        for (var i = 0, l = maps.length; i<l ; i++) {
            if (maps[i]._id === id) {
                return maps[i];
            }
        }
        return null;
    };

    var maps = [
    {
      "title": "Les bars à chat de Paris",
      "description": "Carte des meilleurs bars parisiens dans lesquels votre minou sera chouchouté",
      "tags": ['bar','chat','paris'],
      "contributors_count": "12",
      "markers_count": "63",
      "_id": "1"
    },
    {
      "title": "Les hotels à chat",
      "description": "Carte des meilleurs hotels pour chat",
      "tags": ['chat','hotel'],
      "contributors_count": "4",
      "markers_count": "15",
      "_id": "2"
    },
    {
      "title": "Les plus beau chats",
      "description": "Spottez votre chat. Trop mignon !!",
      "tags": ['beauté','chat','mignon', 'grraou'],
      "contributors_count": "1274",
      "markers_count": "1274",
      "_id": "3"
    },
    {
      "title": "Les plus beau chiens",
      "description": "Spottez votre chien. Trop mignon !!",
      "tags": ['beauté','chien','mignon'],
      "contributors_count": "643",
      "markers_count": "643",
      "_id": "4"
    }
  ];

});
