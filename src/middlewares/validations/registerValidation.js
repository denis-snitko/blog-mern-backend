import { body } from 'express-validator';

const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длина пароля меньше 4-ех символов').isLength({ min: 4 }),
  body('fullName', 'Длина имени меньше 3-ех символов').isLength({ min: 3 }),
  body('avatarUrl', 'Неверный формат url').optional(),
];

export default registerValidation;