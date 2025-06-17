import { Router } from 'express';
import {authRoute} from './authRoute.js';
import productRoute from './productRoute.js';

const rootRouter = Router();

rootRouter.use('/auth', authRoute);
rootRouter.use('/product', productRoute);

export default rootRouter;