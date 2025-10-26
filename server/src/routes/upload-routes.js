const express = require('express');

const uploadRouter = express.Router()
const multer = require('multer')

const {getAllMediaByUser, uploadMedia} = require('../controllers/upload-controller');
const {generateImageFromAiAndUploadToDb } = require('../controllers/ai-image-controller');
const authMiddleware = require('../middleware/auth-middleware');


const upload = multer({
    storage: multer.memoryStorage(), 
    limits: 10 * 1024 * 1024 

    // limits: {
    //     fileSize: 10 * 1024 * 1024 
    // }
}).single('file');


uploadRouter.post('/upload', authMiddleware, (req, res, next) => {
    upload(req, res, function(error) {
        if (error instanceof multer.MulterError) { // Fixed: MulterError (capital M)
            return res.status(400).json({
                success: false,
                message: error.message
            });
        } else if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file found'
            });
        }

        // Call uploadMedia after successful upload
        uploadMedia(req, res, next);
    });
});

uploadRouter.get('/',authMiddleware,getAllMediaByUser);

uploadRouter.post('/ai-image-generate',authMiddleware,generateImageFromAiAndUploadToDb)

module.exports = uploadRouter