import { body } from 'express-validator';

const postValidation = [
  body('title', 'Заголовок статьи меньше 3-ех символов').isLength({ min: 3 }).isString(),
  body('text', 'Тескт статьи меньше 10-ти символов').isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тэгов (укажите массив').optional().isArray(),
  body('imageUrl', 'Неверный формат url').optional(),
];

export default postValidation;