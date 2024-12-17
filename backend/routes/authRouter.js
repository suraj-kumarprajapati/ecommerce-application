


import express from "express";
import { loginUser, logout, registerUser, forgotPassword, resetPassword } from "../controllers/authController.js";


const authRouter = express.Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').get(logout);
authRouter.route('/password/forgot').post(forgotPassword);
authRouter.route('/password/reset/:token').put(resetPassword);


export default authRouter; 