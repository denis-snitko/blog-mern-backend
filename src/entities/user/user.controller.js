import { Router } from 'express';
import { checkAuth, handleValidationErrors, loginValidation, registerValidation } from '../../middleware/index.js';
import { userService } from './user.service.js';

const router = Router();

router.post('/api/register', registerValidation, handleValidationErrors, userService.register);
router.post('/api/login', loginValidation, handleValidationErrors, userService.login);
router.get('/api/me', checkAuth, userService.getMe);

export default router;
