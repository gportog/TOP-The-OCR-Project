const tesseract = require('node-tesseract');

var options = {
	l: 'por',
	psm: 6,
	binary: '/usr/bin/tesseract'
};

exports.tesseract_handler = (cb) => {
    tesseract.process(__dirname + '/samples/test.jpg', options, function(err, text) {
      if(err) {
        cb(500);
      } else {
        cb(text);
      } 
    });
};