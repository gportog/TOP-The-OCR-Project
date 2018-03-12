var express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
multer = require('multer');
require('dotenv').config();


var app = express();
app.use(express.static(__dirname + "./public"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var upload = multer({ dest: "uploads/" });


app.listen(process.env.PORT);