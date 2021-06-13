import multer from 'multer'
import {removeAccents} from '../utils/tools.js'
const pathFile = process.env.PATH 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
  
    cb(null, pathFile);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() +"-"+ removeAccents(file.originalname));
  }
});

const imageFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadImage =  multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: imageFilter
});
export const multerMiddle = multer()