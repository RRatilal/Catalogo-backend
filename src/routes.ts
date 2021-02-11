import { Router } from 'express';
import ImageFilesController from './controllers/ImageFilesController';

import uploadConfig from './confg/multer'
import multer from 'multer';

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/uploads", ImageFilesController.show);
routes.post("/uploads", upload.single('image'), ImageFilesController.create);

export default routes;