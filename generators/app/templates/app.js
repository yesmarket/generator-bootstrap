var express = require('express');
var app = express();

var port = 8080;
app.listen(port, function(err){
	console.log('running server on port ' + port);
});

app.use(express.static('public'));