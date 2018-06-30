var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

app.get('/', function(req, res,next) {

});

app.listen(4200);


-