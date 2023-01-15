import { Router } from "express";
import { commentController } from '../controllers/index.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = Router();

router.post("/api/comments", checkAuth, commentController.create);
router.get("/api/comments/:postId", commentController.getByPostId);

export default router;
