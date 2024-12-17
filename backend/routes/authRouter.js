


import express from "express";
import { loginUser, logout, registerUser, forgotPassword } from "../controllers/authController.js";


const authRouter = express.Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').get(logout);
authRouter.route('/password/forgot').post(forgotPassword);


export default authRouter; 