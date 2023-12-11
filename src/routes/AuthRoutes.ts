import express from 'express';
import { Register, login, logout } from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/Register', Register);

export default authRouter;
