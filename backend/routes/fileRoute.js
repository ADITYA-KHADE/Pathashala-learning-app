const express = require('express');
const router = express.Router();
const { uploadFile, createFile, getFile , getPending, getCompleted} = require('../controllers/fileController');

// Route to handle file upload
router.post('/upload', uploadFile, createFile);
router.get('/:id', getFile);
router.post('/pending',getPending);
router.post('/completed',getCompleted);


module.exports = router;
