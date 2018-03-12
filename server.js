var express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
multer = require('multer');
require('dotenv').config();


var app = express();
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var upload = multer({ dest: "uploads/" }),
    ocr = require('./ocr');


app.post('/v1/convert/ocr', upload.single('file_img'), (req, res) => {
    console.log(JSON.stringify(req.file));
    
    ocr.tesseract_handler(req.file.path, function(response){
     if(response == 500){
      res.status(500).json({message : "Error to convert the image!"});
     } 
     else {
      console.log(response); 
      res.status(200).send(response);
     }
    });
});


app.listen(process.env.PORT);