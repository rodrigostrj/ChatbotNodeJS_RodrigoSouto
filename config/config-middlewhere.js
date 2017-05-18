var express      = require('express');
var consign      = require('consign');
var bodyParser   = require('body-parser');
var morgan       = require("morgan");

module.exports = function() {

    var app = express();

    app.locals.pretty = true;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(function(req, res, next)
    {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });
    
    consign()
         .include('routes')
        .into(app);

    return app;
}

