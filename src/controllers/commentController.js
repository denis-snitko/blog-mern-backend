import { Post, Comment } from '../models/index.js';

// const getAll = async (req, res) => {
//   try {
//     const posts = await Post
//       .find()
//       .populate('author', { fullName: true, email: true, })
//       .sort([['createdAt', 'desc']])
//       .exec();

//     if (!posts) {
//       res.status(404).json([]);
//     }

//     res.json(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Ошибка получения статей',
//     });
//   }
// };

const getByPostId = async (req, res) => {
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
};

const create = async (req, res) => {
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
};

// const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, text, tags, imageUrl } = req.body;

//     const post = await Post
//       .findByIdAndUpdate(id, { title, text, tags, imageUrl, author: req.userId }, { returnDocument: 'after' })
//       .populate('author', {
//         fullName: true,
//         email: true,
//       })
//       .exec();

//     if (!post) {
//       res.status(404).json({
//         message: 'Статья не найдена',
//       });
//     }

//     res.json(post);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Ошибка обновления статьи',
//     });
//   }
// };

// const remove = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Post.findByIdAndDelete(id);

//     res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Ошибка удаления статьи',
//     });
//   }
// };

export { getByPostId, create };
