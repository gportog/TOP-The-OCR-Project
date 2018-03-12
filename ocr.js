const tesseract = require('node-tesseract');

var options = {
	l: 'por',
	psm: 6,
	binary: '/usr/bin/tesseract'
};

exports.tesseract_handler = (img_path, cb) => {
    tesseract.process(__dirname + '/' + img_path, options, function(err, text) {
      if(err) {
        let error = {
          code: 500,
          message:err
        }
        cb(error);
      } else {
        let data = {
          code: 200,
          message: text
        }
        cb(data);
      } 
    });
};