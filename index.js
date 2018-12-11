const express = require('express');
const path = require('path');
const cors = require('cors');
const request = require('request');
const Behance = require('node-behance-api');

var app = express();

// Allow cors
app.use(cors());

// Behance module setup
const behance = new Behance({'client_id': `${process.env.behanceKey}`});
Behance.initOptions();

app.get('/', function(req, res){
	res.writeHead(302, {'Location': 'https://owap-app.herokuapp.com'});
	console.log('Redirect to React server https://owap-app.herokuapp.com');
    res.end('Welcome to the api');
})

app.use(function(req,res,next){
	console.log(`${req.method} request for ${req.url}`);
	next();
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server is running on port '+app.get('port'));
})
