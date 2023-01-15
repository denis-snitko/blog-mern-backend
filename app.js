import cors from 'cors';
import express from 'express';
import start from './src/helpers/start.js';
import { authRoutes, commentRoutes, postRoutes, tagsRoutes, uploadRoutes } from './src/routes/index.js';


const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use(authRoutes, postRoutes, uploadRoutes, tagsRoutes, commentRoutes);

start(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server has been started on port ${APP_PORT}`);
  });
}).then(() => {});
