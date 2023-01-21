export const uploadService = {
  uploadImage: async (req, res) => {
    try {
      res.json({ url: `/uploads/${req.file.originalname}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка загрузки изображения',
      });
    }
  },
};
