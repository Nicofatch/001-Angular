app.service('utilsService', function () {
   this.guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    this.getQueryStringParams = function(str) {
        var queryString = str || window.location.search || '';
        var keyValPairs = [];
        var params      = {};
        queryString     = queryString.replace(/.*?\?/,"").replace('#/','');

        if (queryString.length) {
            keyValPairs = queryString.split('&');
            for (pairNum in keyValPairs) {
                var key = keyValPairs[pairNum].split('=')[0];
                if (!key.length) continue;
                if (typeof params[key] === 'undefined')
                    params[key] = [];
                params[key].push(keyValPairs[pairNum].split('=')[1]);
            }
        }
        return params;
    }
});
