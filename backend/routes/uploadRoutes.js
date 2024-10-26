import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});


function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //mime Type, an actual content type =>extension of a video can be changed to image 
    // so we need to check the actual content. Multer in Node.js will 
    // automatically detect the mimetype of the uploaded file
    const mimeType = fileTypes.test(file.mimeType);

    if (extname && mimeType) {
        return cb(null, true)
    } else {
        cb('Image only!')
    }
}


const upload = multer({
    storage,
});


router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`
    })
})
export default router;