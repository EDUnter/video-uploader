const express = require('express');
const router = express.Router();
const upload = require('./config/upload');
const videosController = require('./controllers/videosController');

// routes
router.get('/', videosController.getAll);
router.get('/:id', videosController.getById);
router.post('/', upload.single("uploadfile"), videosController.create);
router.put('/:id', upload.single("uploadfile"), videosController.update);
router.delete('/:id', videosController._delete);

module.exports = router;