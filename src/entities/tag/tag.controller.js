import { Router } from "express";
import { postService } from '../post/post.service.js';

const router = Router();

router.get("/api/tags", postService.getLastTags);
router.get("/api/tags/:tag", postService.getAllByTag);

export default router;
