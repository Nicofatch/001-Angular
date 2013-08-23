app.service('mapService', function () {
    this.getSpots = function () {
	return spots;
    };

    this.insertSpot = function (title, description) {
        var topID = spots.length + 1;
        spots.push({
            id: topID,
            title: title ,
            description: description ,
	    longitude:0,
	    latitude:0
        });
    };

/*    this.deleteCustomer = function (id) {
        for (var i = customers.length - 1; i >= 0; i--) {
            if (customers[i].id === id) {
                customers.splice(i, 1);
                break;
            }
        }
    }; */

    this.getSpot = function (id) {
        for (var i = 0; i < spots.length; i++) {
            if (spots[i].id === id) {
                return spots[i];
            }
        }
        return null;
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
    },
    {
      "title": "Maison  de Suresnes",
      "description": "On y est bien :)",
      "sports": null,
      "longitude": "2.209920287132263",
      "latitude": "48.865247626558684",
      "_id": "4"
    }
  ];

});
