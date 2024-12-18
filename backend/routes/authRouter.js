


import express from "express";
import { loginUser, logout, registerUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile } from "../controllers/authController.js";
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
authRouter.route('/me/update').put(isUserAuthenticated, updateProfile);
authRouter.route('/password/update').put(isUserAuthenticated, updatePassword);



export default authRouter; 