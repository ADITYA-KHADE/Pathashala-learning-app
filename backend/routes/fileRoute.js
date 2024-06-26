const express = require('express');
const router = express.Router();
const { uploadFile, createFile, getFile } = require('../controllers/fileController');
const { checkToken } = require('../middleware/checkToken');

// Route to handle file upload
router.post('/upload', uploadFile, createFile);
router.get('/:id', getFile);

module.exports = router;
