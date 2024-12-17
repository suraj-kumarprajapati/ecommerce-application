


import express from "express";
import { loginUser, logout, registerUser } from "../controllers/authController.js";


const authRouter = express.Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').get(logout);


export default authRouter; 