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

app.use(function(req,res,next){
	console.log(`${req.method} request for ${req.url}`);
	next();
});

app.get('/', function(req, res){
	res.writeHead(302, {'Location': 'https://owap-app.herokuapp.com'});
	console.log('Redirect to React server https://owap-app.herokuapp.com');
    // res.end('Welcome to the api');
})

// Behance request for userdata
app.get(`/behance/user/:user`, function(req,res){
	behance.get({
		api: Behance.APIS.GET_USER,
		params: {
			user: req.params.user
		}
	}, function(err, response){
		// Set the header to specify JSON content
		res.setHeader('Content-Type', 'application/json');
		if(err){
			res.send(err);
		} else{
			res.send(response);
		}
	})
});

// Behance request for user project data
app.get(`/behance/user/:user/projects`, function(req,res){
	behance.get({
		api: Behance.APIS.GET_USER_PRODUCT,
		params: {
			user: req.params.user
		}
	}, function(err, response){
		// Set the header to specify JSON content
		res.setHeader('Content-Type', 'application/json');
		if(err){
			res.send(err);
		} else{
			res.send(response);
		}
	})
});

// Behance request for project comments data
app.get(`/behance/project/:project/comments/:page`, function(req,res){
	behance.get({
		api: Behance.APIS.GET_PRODUCT_COMMENTS,
		params: {
			project_id: req.params.project,
			page: req.params.page
		}
	}, function(err, response){
		// Set the header to specify JSON content
		res.setHeader('Content-Type', 'application/json');
		if(err){
			res.send(err);
		} else{
			res.send(response);
		}
	});
})

// Routes for data requests
app.use(`/data`, express.static(path.join(__dirname, `data`)));

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
    console.log('Server is running on port '+app.get('port'));
})
