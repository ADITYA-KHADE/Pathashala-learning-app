const express = require('express');
const router = express.Router();
const { uploadFile, createFile, getFile , getPending, getCompleted,updateFileMarks,allCompleted} = require('../controllers/fileController');

// Route to handle file upload
router.post('/upload', uploadFile, createFile);
router.get('/:id', getFile);
router.post('/pending',getPending);
router.post('/completed',getCompleted);
router.post('/update-marks/:id', updateFileMarks);
router.post('/allcompleted',allCompleted);
module.exports = router;
