exports.generate = function(req, res) {
    var item={};
    for (var i=0;i<100;i++) {
        for (var j=0;j<100;j++) {
            item = {
                "title": i + '_' + j,
                "description": "Yeah",
                "sports": "Rando",
                "loc": [i/10,40+j/10],
                "_id":  i/10 + '_' + j/10
            };
             db2.collection('spots', function(err, collection) {
                    collection.insert(item, {safe:true}, function(err, result) {
                        if (err) {
                            res.send({'error':'An error has occurred'});
                        } else {
                            console.log('Success: ' + JSON.stringify(result[0]));
                        }
                    });
                });
        }
    }
    res.send(item);  
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving spot with _id = [ ' + id + ']');
    db2.collection('spots', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            // Wrap the location in a root element called "spot".
            res.json(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db2.collection('spots', function(err, collection) {
        collection.find().toArray(function(err, items) {
	    res.send(tems);
        });
    });
};

exports.search = function(req, res) {
    db2.collection('spots', function(err, collection) {
        collection.find({ 'loc' : { '$near' : [ parseFloat(req.params.lng) , parseFloat(req.params.lat) ] } }).limit(100).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var spot = req.body.spot;
    console.log('Adding spot: ' + JSON.stringify(spot));
    db2.collection('spots', function(err, collection) {
        collection.insert(spot, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.update = function(req, res) {
    var id = req.params.id;
    var spot = req.body.spot;
    console.log('Updating spot: ' + id);
    console.log(JSON.stringify(spot));
    db2.collection('spots', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, spot, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating spot: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(spot);
            }
        });
    });
}
 
exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting spot: ' + id);
    db2.collection('spots', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send({});
            }
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
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
 
    db2.collection('spots', function(err, collection) {
        collection.insert(spots, {safe:true}, function(err, result) {});
    });
 
};



