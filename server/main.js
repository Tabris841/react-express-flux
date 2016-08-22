var express = require('express');
var parser = require('body-parser');

var app = new express();
require('./database.js');

app.get('/', function(req, res) {
        res.render('./../app/index.ejs', {});
    })
    .use(express.static(__dirname + '/../.tmp'))
    .use(express.static(__dirname + '/../bower_components'))
    .listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

require('./routes/items')(app);