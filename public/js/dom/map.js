var spotMap;

$(document).ready(function(){
  // Initialize the map
  spotMap = new SpotMap('map');
});

function SpotMap(map_id) {

    this.map_id = map_id;
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
    this.map.on('locationfound', onLocationFound);
    this.map.on('locationerror', onLocationError);
    this.map.setView([48.51, 2.21], 3);
    // Get geolocation and center the map
    //this.geoLocate();

    this.geoLocate = function () {
        //TODO: cache the location
        this.map.locate({
            setView: true,
            maxZoom: 18
        });
    };

    this.centerOnGeoPosition = function () {
        /*this.map.fitBounds([this.geoPosition.marker.LMarker._latlng], {
            paddingTopLeft: [($(window).width()/4), 90],
            paddingBottomRight: [50,50],
            zoom:true
        });*/
        
        this.map.panTo([this.geoPosition.marker.LMarker._latlng.lat, this.geoPosition.marker.LMarker._latlng.lng]);
    };

    this.moveGeoMarker = function (latlng) {
        console.log(latlng);
        this.geoPosition.marker.LMarker._latlng.lat = latlng.lat;
        this.geoPosition.marker.LMarker._latlng.lng = latlng.lng;
        this.geoPosition.marker.LMarker.update();
        this.centerOnGeoPosition();
    }

    this.removeGeoMarker = function () {
        // Remove the marker
        this.map.removeLayer(this.geoPosition.marker.LMarker);
        // Clean the object
        this.geoPosition = {};
    };

    this.fitOnBounds = function () {
        // Center the map on the displayed markers
        if (this.bounds.length)
            this.map.fitBounds(this.bounds, {
                paddingTopLeft: [($(window).width()/4), 150],
                paddingBottomRight: [150,150]
            });
    };

    this.focusOnMarker = function (id) {
        var LMarker = this.markers.getItem(id).LMarker;
        // Pan the map to the marker (smooth move)
        this.map.panTo(LMarker._latlng);
        // Open the popup
        LMarker.openPopup();
    };

    this.displayMap = function (position) {
        if (typeof position === "undefined") {
            //If no position is specified, load geoCoords
            this.map.setView([this.geoPosition.coords.latitude, this.geoPosition.coords.longitude], 10);
        } else {
            this.map.setView([position.coords.latitude, position.coords.longitude], 10);
        }
    };

    this.addMarker = function (marker) {
        var oldMarker = this.markers.getItem(marker.id);
        if (typeof oldMarker === "undefined") {

            // Display the marker
            //marker.LMarker.addTo(this.map);
            this.map.addLayer(marker.LMarker);

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
		this.markers.setItem(_marker.id, marker);
	    }
	}*/
    };

    this.clear = function (options) {
        //console.log(this.map);
        // Loop on all markers
        for (var k in this.markers.items) {
            if (this.markers.hasItem(k)) {
                this.map.removeLayer(this.markers.items[k].LMarker);
                this.markers.removeItem(k);
            }
        }
        // Reset the map bounds, used to adjust the view
        this.bounds = [];
    };

};

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    var message = "You are within " + radius + " meters from this point";

    // Update geoposition coords
    //this.geoPosition.coords.latitude = e.latlng.lat;
    //this.geoPosition.coords.longitude = e.latlng.lng;

    // Create a new marker
    var marker = new Marker({
        id: 'geoPosition',
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        title: message,
        draggable: true,
        icon: 'icon-screenshot icon-large',
        color: 'red'
    });
    
    // Display the marker
    // TODO: in the context of this function, "this" is not spotMap, but the map itself so... ugly workaround
    spotMap.map.addLayer(marker.LMarker);

    // store the marker
    spotMap.geoPosition.marker = marker;
};

function onLocationError(e) {
    //TODO
};


function Marker(options) {

    var LMarkerOptions = {};
    this.id = options.id;
    // if marker is draggable
    if (options.draggable)
        LMarkerOptions.draggable = true;

    // if a special icon has been specified
    if (options.icon && options.color) {
        var icon = L.AwesomeMarkers.icon({
            icon: options.icon,
            color: options.color
        })
        LMarkerOptions.icon = icon;
    }
    this.latitude = options.latitude;
    this.longitude = options.longitude;

    // Create Leaflet marker
    this.LMarker = L.marker([this.latitude, this.longitude], LMarkerOptions);

    if (typeof options.title != "undefined") {
        this.LMarker.bindPopup(options.title);
    }

    /*this.clear = function (map) {
        //console.log(map);
        map.removeLayer(this.LMarker);
    }*/
};

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