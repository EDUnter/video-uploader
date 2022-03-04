const multer = require('multer');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/resources/static/assets/uploads/')
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});

let upload = multer({storage: storage});

module.exports = upload;