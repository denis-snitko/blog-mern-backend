import { Router } from "express";
import { checkAuth, handleValidationErrors, loginValidation, registerValidation } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';

const router = Router();

router.post("/api/register", registerValidation, handleValidationErrors, userController.register);
router.post("/api/login", loginValidation, handleValidationErrors, userController.login);
router.get("/api/me", checkAuth, userController.getMe);

export default router;
