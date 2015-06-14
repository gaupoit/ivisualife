// set up ======================================================================
var express       = require('express');
var http          = require('http');
var path          = require('path');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

var app = express();

// configuration ===============================================================
    app.set('port', process.env.PORT || 1811);
    app.use(express.static(__dirname  + '/public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.get('/', function(req, res, next) {

        res.sendfile('public/app/index.html');

    });


// routes mapping ==============================================================
require('./app/routes/routes')(app);

// listen (start app with node app.js) ======================================
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
