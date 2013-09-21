var SpotMap = (function _SpotMap() {
    var self = Object.create({});

    self._init = function _init() {

        // Create the map
        this.map = L.map(this.map_id);
        this.markers = new HashTable();
    	this.bounds = [];
    	this.geoPosition = {};

        // Set the legend
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, {
                maxZoom: 18,
                attribution: osmAttrib,
                timeout: 3000000
            });
        osm.addTo(this.map);

        // Set the event receivers
        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', this.onLocationError);
        this.map.setView([48.51, 2.21], 1);
        // Get geolocation and center the map
        //self.geoLocate();
    };

    self.geoLocate = function () {
        //TODO: cache the location
        this.map.locate({
            setView: true,
            maxZoom: 18
        });
    };

    self.centerOnGeoPosition = function () {
        this.map.panTo([this.geoPosition.marker.LMarker._latlng.lat, this.geoPosition.marker.LMarker._latlng.lng]);
    };

    self.moveGeoMarker = function (latlng) {
        this.geoPosition.marker.LMarker._latlng.lat = latlng.lat;
        this.geoPosition.marker.LMarker._latlng.lng = latlng.lng;
        this.centerOnGeoPosition();
    }

    self.removeGeoMarker = function () {
        // Remove the marker
        this.geoPosition.marker.clear(this.map);
        // Clean the object
        this.geoPosition = {};
    };

    self.fitOnBounds = function () {
        // Center the map on the displayed markers
        if (this.bounds.length)
            this.map.fitBounds(this.bounds, {
                paddingTopLeft: [($(window).width()/4) + 90, 90],
                paddingBottomRight: [50,50]
            });
    };

    self.onLocationFound = function (e) {
        var radius = e.accuracy / 2;
        var message = "You are within " + radius + " meters from this point";

        // Update geoposition coords
        //self.geoPosition.coords.latitude = e.latlng.lat;
        //self.geoPosition.coords.longitude = e.latlng.lng;

        // Create a new marker
        var marker = Object.create(Marker, {
            id: {
                value: 'geoPosition'
            },
            latitude: {
                value: e.latlng.lat
            },
            longitude: {
                value: e.latlng.lng
            },
            title: {
                value: message
            },
            draggable: {
                value: true
            },
            icon: {
                value: 'icon-screenshot icon-large'
            },
            color: {
                value: 'red'
            }
        });
        marker._init();
        
        // Display the marker
        // TODO: in the context of this function, "this" is not spotMap, but the map itself so... ugly workaround
        marker.LMarker.addTo(spotMap.map);

        // store the marker
        spotMap.geoPosition.marker = marker;

    };

    self.onLocationError = function (e) {
        //TODO
    };


    self.focusOnMarker = function (id) {
        var LMarker = this.markers.getItem(id).LMarker;
        // Pan the map to the marker (smooth move)
        this.map.panTo(LMarker._latlng);
        // Open the popup
        LMarker.openPopup();
    };

    self.displayMap = function (position) {
        if (typeof position === "undefined") {
            //If no position is specified, load geoCoords
            this.map.setView([this.geoPosition.coords.latitude, this.geoPosition.coords.longitude], 10);
        } else {
            this.map.setView([position.coords.latitude, position.coords.longitude], 10);
        }
    };

    self.addMarker = function (marker) {
        var oldMarker = this.markers.getItem(marker.id);
        if (typeof oldMarker === "undefined") {

            // Display the marker
            marker.LMarker.addTo(this.map);

            // if specified, display the label in a popup
            //if (typeof marker.label != "undefined") {
            //	marker.LMarker.bindPopup(marker.label);
            //}

            // Update markers hashtable
            this.markers.setItem(marker.id, marker);

            // update the map bounds
            this.bounds.push(marker.LMarker._latlng);
        }
        /*else {
	    // Marker already exists
	    if ((oldMarker.longitude != marker.longitude) || (oldMarker.latitude != marker.latitude)) {
		console.log('existe deja');
		// Move the existing marker
		var lat = (marker.latitude);
		var lng = (marker.longitude);
		var newLatLng = new L.LatLng(lat, lng);
		oldMarker.LMarker.setLatLng(newLatLng); 

		// Store the new marker
		self.markers.setItem(_marker.id, marker);
	    }
	}*/
    };

    self.clear = function (options) {
        // Loop on all markers
        this.markers.each(function (k, marker) {
            // Remove marker from map
            marker.clear(this.map);
            // Remove marker from hashtable
            this.markers.removeItem(k);
        });
        // Reset the map bounds, used to adjust the view
        this.bounds = [];
    };


    return self;
}());



var Marker = (function _Marker() {

    var self = Object.create({});

    self._init = function _init() {

        var options = {};

        // if marker is draggable
        if (this.draggable)
            options.draggable = true;

        // if a special icon has been specified
        if (this.icon && this.color) {
            var icon = L.AwesomeMarkers.icon({
                icon: this.icon,
                color: this.color
            })
            options.icon = icon;
        }

        // Create Leaflet marker
        this.LMarker = L.marker([this.latitude, this.longitude], options);

        if (typeof this.title != "undefined") {
            this.LMarker.bindPopup(this.title);
        }

        return this;
    };

    self.clear = function (map) {
        map.removeLayer(this.LMarker);
    }

    return self;
}());

function HashTable(obj) {
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function (key, value) {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        } else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function (key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function (key) {
        return this.items.hasOwnProperty(key);
    }

    this.removeItem = function (key) {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        } else {
            return undefined;
        }
    }

    this.keys = function () {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function () {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function (fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function () {
        this.items = {}
        this.length = 0;
    }
}