import { Router } from 'express';
import { upload } from '../../helpers/multerInit.js';
import checkAuth from '../../middleware/checkAuth.js';
import { uploadService } from './upload.service.js';

const router = Router();

router.post('/api/upload', checkAuth, upload.single('image'), uploadService.uploadImage);

export default router;
