import Post from '../post/post.schema.js';
import Comment from './comment.schema.js';

export const commentService = {
  getByPostId: async (req, res) => {
    try {
      const { postId } = req.params;

      const comments = await Comment.find({ postId })
        .populate('author', { fullName: true, email: true, avatarUrl: true })
        .sort([['createdAt', 'desc']])
        .exec();

      if (!comments) {
        res.status(404).json([]);
      }

      res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка получения комментариев',
      });
    }
  },

  create: async (req, res) => {
    try {
      const { postId, text } = req.body;

      const document = new Comment({ postId, text, author: req.userId });

      const comment = await document.save();

      await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } }, { returnDocument: 'after' });

      res.status(201).json(comment);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка создания комментария',
      });
    }
  },
};
