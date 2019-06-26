require('./src');
/* require('./src/cloudinaryConfig');
const { createReadStream } = require('fs');
const cloudinary = require('cloudinary').v2;

const stream = cloudinary.uploader.upload_stream(function(error, result) { 
	error ? 
		console.log('res', error, '\n\n\n\n\n\n\n'):
		console.log('res', result, '\n\n\n\n\n\n\n'); 
});
const readStream = createReadStream('C:/Users/RiNDo/WebDev/Projects/SCMS/uploads/img.jpg', {encoding: 'binary'});
readStream
	.on('data', data => stream.write(data))
	.on('end', () => stream.end()); */