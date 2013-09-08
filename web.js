var express = require('express');
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , async   = require('async')
  , engine = require('ejs-locals')
  , ROUTES  = require('./routes')
  , Router = require('./router');

var app = express();
var router = new Router();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
app.use(express.logger("dev"));
app.use(router);

for(var ii in ROUTES) {
    router.get(ROUTES[ii].path, ROUTES[ii].fn);
}

//app.use(express.logger());

/*app.use(function(req,res,next) {
    console.log('%s %s', req.method, req.url);
    next();
});*/
/*app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/img", express.static(__dirname + '/img'));*/

/*app.get('/', function(request, response) {
    var html = fs.readFileSync('./index.html').toString()
    response.send(html);
});*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
