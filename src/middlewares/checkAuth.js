import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Нет доступа' });
  }
  
  try {
    const decodedToken = jwt.verify(token, 'mySecretKey');
    req.userId = decodedToken._id;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Нет доступа' });
  }
};