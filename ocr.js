const tesseract = require('node-tesseract');

var options = {
	l: 'por',
	psm: 6,
	binary: '/usr/bin/tesseract'
};

tesseract.process(__dirname + '/samples/test.jpg', options, function(err, text) {
   if(err) {
       console.error(err);
   } else {
       console.log(text);
   }
});