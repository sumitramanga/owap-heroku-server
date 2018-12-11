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
    res.end('Welcome to the api');
})

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server is running on port '+app.get('port'));
})
