import express from "express";
import multer from 'multer'
import multerConfig from "../configs/multer.config.js";
import { ErrorUpload, uploadImage } from "../middlewares/uploadImages.js";

const routerUpload = express.Router();

const uploads = multer({
    storage: multerConfig.storage,
    fileFilter: multerConfig.fileFilter,
})

routerUpload.post("/uploadImages", uploads.array('images', 10), uploadImage, ErrorUpload);

export default routerUpload;