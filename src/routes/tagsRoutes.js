import { Router } from "express";
import { postController } from '../controllers/index.js';
import { checkAuth, handleValidationErrors, postValidation } from '../middlewares/index.js';

const router = Router();

router.get("/api/tags", postController.getLastTags);

export default router;
