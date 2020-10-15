import Orphanage  from './models/Orphanage';
import {Router} from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import orphanageController from './controllers/OrphanageController';
import uploadConfig from './config/upload';

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/orphanages', orphanageController.index)
routes.get('/orphanages/:id', orphanageController.show)
routes.post('/orphanages', upload.array('images'), orphanageController.create)

export default routes;