const tesseract = require('node-tesseract');

var options = {
	l: 'por',
	psm: 6,
	binary: '/usr/bin/tesseract'
};

exports.tesseract_handler = (img_path, cb) => {
    tesseract.process(__dirname + '/' + img_path, options, function(err, text) {
      if(err) {
        cb(500);
      } else {
          console.log(text);
        cb(text);
      } 
    });
};