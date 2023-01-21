import cors from 'cors';
import express from 'express';
import start from './src/helpers/start.js';

import userRoutes from './src/entities/user/user.controller.js'
import postRoutes from './src/entities/post/post.controller.js'
import uploadRoutes from './src/entities/upload/upload.controller.js'
import tagRoutes from './src/entities/tag/tag.controller.js'
import commentRoutes from './src/entities/comment/comment.controller.js'


const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use(userRoutes, postRoutes, uploadRoutes, tagRoutes, commentRoutes);

start(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server has been started on port ${APP_PORT}`);
  });
}).then(() => {});
