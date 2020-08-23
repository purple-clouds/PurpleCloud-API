var express = require('express');
var app = express();
var port = process.env.port || 1337;

app.get('/', function(request, response){
    response.status(200).json({serverup:true});
});
  
app.listen(port, function() {
    console.log('App listening at http://localhost:' + port)
});