var express = require('express');
var parser = require('body-parser');
var React = require('react');
var ReactDOMServer  = require('react-dom/server');

var app = new express();
var GroceryItem = require('./models/GroceryItem');
require('babel-core/register')({
    presets: ['es2015', 'react']
});

require('./database.js');

app.get('/', function(req, res) {
        // res.render('./../app/index.ejs', {});
        var application = React.createFactory(require('./../app/components/GroceryItemList.jsx')) ;

        GroceryItem.find(function (error, data) {
            var generated = ReactDOMServer.renderToString(application({
                items: data
            }));

            res.render('./../app/index.ejs', {reactOutput: generated});
        })
    })
    .use(express.static(__dirname + '/../.tmp'))
    .use(express.static(__dirname + '/../bower_components'))
    .listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

require('./routes/items')(app);