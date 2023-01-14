import { Post } from '../models/index.js';

const getAll = async (req, res) => {
  try {
    const posts = await Post
      .find()
      .populate('author', { fullName: true, email: true, })
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
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post
      .findByIdAndUpdate(id, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' })
      .populate('author', {
        fullName: true,
        avatarUrl: true,
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
      message: 'Ошибка получения статьи',
    });
  }
};

const create = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;
    
    const document = await new Post({ title, text, tags, imageUrl, author: req.userId });
    
    const post = await document.save();
    
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка создания статьи',
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, tags, imageUrl } = req.body;
    
    const post = await Post
      .findByIdAndUpdate(id, { title, text, tags, imageUrl, author: req.userId }, { returnDocument: 'after' })
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
};

const remove = async (req, res) => {
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
};

const getLastTags = async (req, res) => {
  try {
    const posts = await Post.find().limit(5).exec();
    const tags = posts.map(item => item.tags).flat().slice(0, 5);
    
    
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка получения тегов',
    });
  }
};

export { getAll, getOne, create, update, remove, getLastTags };
