import { body } from 'express-validator';

const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длина пароля меньше 4-ех символов').isLength({ min: 4 }),
];

export default loginValidation;