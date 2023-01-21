import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.schema.js';

export const userService = {
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const document = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        password: hashedPassword,
      });

      const { _id, email, fullName, avatarUrl, createdAt, updatedAt } = await document.save();
      const token = jwt.sign({ _id }, 'mySecretKey', { expiresIn: '1d' });

      res.status(201).json({ _id, email, fullName, avatarUrl, createdAt, updatedAt, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка регистрации',
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(403).json({
          email: {
            message: 'Пользователь не найден',
          },
        });
      }

      const { _id, email, password, fullName, avatarUrl, createdAt, updatedAt } = user;

      const isValidPassword = await bcrypt.compare(req.body.password, password);

      if (!isValidPassword) {
        return res.status(403).json({
          password: {
            message: 'Неверный пароль',
          },
        });
      }

      const token = jwt.sign({ _id }, 'mySecretKey', { expiresIn: '1d' });

      res.json({ _id, email, fullName, avatarUrl, createdAt, updatedAt, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка авторизации',
      });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.userId, { password: false });

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка авторизации',
      });
    }
  },
};
