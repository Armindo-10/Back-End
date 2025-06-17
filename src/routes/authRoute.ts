import { Router } from 'express'
import { login, signup } from '../controller/authController.js';

export const authRoute: Router = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);




