import { Router } from 'express';
import { postService } from './post.service.js';
import { checkAuth, handleValidationErrors, postValidation } from '../../middleware/index.js';

const router = Router();

router.get('/api/posts', postService.getAll);
router.get('/api/posts/popular', postService.getAllPopular);
router.get('/api/posts/:id', postService.getOne);
router.post('/api/posts', checkAuth, postValidation, handleValidationErrors, postService.create);
router.patch('/api/posts/:id', checkAuth, postValidation, handleValidationErrors, postService.update);
router.delete('/api/posts/:id', checkAuth, postService.remove);

export default router;
