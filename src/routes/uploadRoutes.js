import { Router } from "express";
import { upload } from '../helpers/multerInit.js';
import checkAuth from '../middlewares/checkAuth.js';
import { uploadController } from '../controllers/index.js';


const router = Router();

router.post("/api/upload", checkAuth, upload.single('image'), uploadController.uploadImage);

export default router;
