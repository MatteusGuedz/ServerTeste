import express from 'express';

import {celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointController from './controllers/PointsController';
import ItemController from './controllers/ItemsController';


const pointController  = new PointController();
const itemController  = new ItemController();

const routes = express.Router();
const upload = multer(multerConfig);




routes.get('/items',itemController.index );
routes.get('/points', pointController.index )
routes.get('/points/:id', pointController.show )
routes.post('/points',
 upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  },{

    abortEarly: false
  }),
  pointController.create )

export default routes;