import { Router } from "express";
import { postController } from '../controllers/index.js';
import { checkAuth, handleValidationErrors, postValidation } from '../middlewares/index.js';

const router = Router();

router.get("/api/posts", postController.getAll);
router.get("/api/posts/:id", postController.getOne);
router.post("/api/posts", checkAuth, postValidation, handleValidationErrors, postController.create);
router.patch("/api/posts/:id", checkAuth, postValidation, handleValidationErrors, postController.update);
router.delete("/api/posts/:id", checkAuth, postController.remove);

export default router;
