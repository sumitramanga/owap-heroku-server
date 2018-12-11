const express = require('express');

var app = express();

app.get('/', function(req, res){
    res.end(process.env.behanceKey);
})

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server is running on port '+app.get('port'));
})
