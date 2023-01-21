import Post from './post.schema.js';

export const postService = {
  getAll: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('author', { fullName: true, avatarUrl: true })
        .sort([['createdAt', 'desc']])
        .exec();

      if (!posts) {
        res.status(404).json([]);
      }

      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка получения статей',
      });
    }
  },

  getAllByTag: async (req, res) => {
    try {
      const { tag } = req.params;

      const posts = await Post.find({ tags: tag })
        .populate('author', { fullName: true, avatarUrl: true })
        .sort([['createdAt', 'desc']])
        .exec();

      if (!posts) {
        res.status(404).json([]);
      }

      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка получения статей',
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Post.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' })
        .populate('author', { fullName: true, avatarUrl: true })
        .exec();

      if (!post) {
        res.status(404).json({
          message: 'Статья не найдена',
        });
      }

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка получения статьи',
      });
    }
  },

  create: async (req, res) => {
    try {
      const { title, text, tags, imageUrl } = req.body;

      const document = new Post({ title, text, tags, imageUrl, author: req.userId });

      const post = await document.save();

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка создания статьи',
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, text, tags, imageUrl } = req.body;

      const post = await Post.findByIdAndUpdate(
        id,
        { title, text, tags, imageUrl, author: req.userId },
        { returnDocument: 'after' }
      )
        .populate('author', {
          fullName: true,
          email: true,
        })
        .exec();

      if (!post) {
        res.status(404).json({
          message: 'Статья не найдена',
        });
      }

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка обновления статьи',
      });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;

      await Post.findByIdAndDelete(id);

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка удаления статьи',
      });
    }
  },

  getLastTags: async (req, res) => {
    try {
      const posts = await Post.find().limit(10).exec();
      const tags = posts
        .map((item) => item.tags)
        .flat()
        .slice(0, 5);

      res.json(tags);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка получения тегов',
      });
    }
  },
};
