import { Router } from "express";
import { postController } from '../controllers/index.js';

const router = Router();

router.get("/api/tags", postController.getLastTags);
router.get("/api/tags/:tag", postController.getAllByTag);

export default router;
