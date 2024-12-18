


import express from "express";
import { loginUser, logout, registerUser, forgotPassword, resetPassword, getUserProfile, updatePassword } from "../controllers/authController.js";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";


const authRouter = express.Router();


// authentication and authorisation routes
authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').get(logout);
authRouter.route('/password/forgot').post(forgotPassword);
authRouter.route('/password/reset/:token').put(resetPassword);

// user's routes
authRouter.route('/me').get(isUserAuthenticated , getUserProfile);
authRouter.route('/password/update').post(isUserAuthenticated, updatePassword);


export default authRouter; 