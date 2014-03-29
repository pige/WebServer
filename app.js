
/**
 * Module dependencies.
 */

var express = require('express');
var api = require('./routes/api');
var database = require('./routes/database');
var http = require('http');
var path = require('path');

var app = express();


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'accept, X-Requested-With, Content-Type');

    next();
};

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(allowCrossDomain);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/userlist', database.userlist(db));
app.post('/api/registerUser', api.register);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
