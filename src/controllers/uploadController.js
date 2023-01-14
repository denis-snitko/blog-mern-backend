import * as path from 'path';

const uploadImage = async (req, res) => {
  console.log(req);
  try {
    res.json({ url: `/uploads/${req.file.originalname}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка загрузки изображения',
    });
  }
};

export { uploadImage };
