import { Router } from 'express';
import { commentService } from './comment.service.js';
import checkAuth from '../../helpers/middleware/checkAuth.js';

const router = Router();

router.post('/api/comments', checkAuth, commentService.create);
router.get('/api/comments/:postId', commentService.getByPostId);

export default router;
