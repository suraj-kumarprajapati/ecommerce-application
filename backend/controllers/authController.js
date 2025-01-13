import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendTokenToUser from "../utils/sendTokenToUser.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { uploadFile } from "../utils/cloudinary.js";



/**
 *  Authentication and Authorisation
 */


// register new user -> api/v1/register
export const registerUser = catchAsyncErrors(

    async (req, res, next) => {
        // get new user's info
        const {name, email, password} = req.body;

        // save user's info in the database -> register user
        const newUser = await userModel.create({
            name,
            email,
            password
        });

        // for successfull registeration, send token with response to the user
        sendTokenToUser(newUser, 200, res);        
    }
 
);





// login user -> api/v1/login
export const loginUser = catchAsyncErrors(

    async (req, res, next) => {
        // get user's login info
        const { email, password } = req.body;

        // if email and password is supplied by the user
        if(!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }

        // find user based on the email
        const user = await userModel.findOne({ email }).select("+password");

        // if user not present in the database
        if(!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        // check if password is correct or not
        const isPasswordCorrect = await user.comparePassword(password);

        // if password is incorrect
        if(!isPasswordCorrect) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        // if password is correct
        // for successfull login, send token with response to the user
        sendTokenToUser(user, 200, res);
    }
 
);



// logout -> api/v1/logout
export const logout = catchAsyncErrors(

    (req, res, next) => {

        res.cookie("token", null, {
            expires : new Date(Date.now()),
            httpOnly : true,
        });
        
        res.status(200).json({
            message : "Logged Out successfully",
        });
    }
    
);



// upload avatar -> api/v1/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(

    async (req, res, next) => {
        try {
            // upload awatar
            const avatarResponse = await uploadFile(req.body?.avatar, "shopCart/avatars");

            // after uploading the file in cloudinary, save the url link in the database
            const user = await userModel.findByIdAndUpdate(req?.user?._id, {
                avatar : avatarResponse,
            });
            
            // send response to user
            res.status(200).json({
                user,
            });
        }
        catch(error) {
            next(new ErrorHandler("file could not be uploaded", 400));
        }

    }
    
);



// forgot password -> api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(

    async (req, res, next) => {

        // find user based on the email
        const user = await userModel.findOne({ email : req.body.email });

        // if user not present in the database
        if(!user) {
            return next(new ErrorHandler("User not found with this email", 404));
        }

        // get reset password token
        const resetToken = user.getResetPasswordToken();

        // save the hashed reset token and expiry time in the database
        await user.save(); 

        // create reset password url
        const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

        // message generate form email template
        const message = getResetPasswordTemplate(user?.name, resetUrl);

        
        try {
            // finally, send the mail to the user
            await sendEmail({
                email : user.email,
                subject : "ShopCart Password Recovery",
                message,
            });
            
            // if successfully sent mail
            res.status(200).json({
                message : `Email sent to ${user.email}`,
            })
        }
        catch(error) {
            // if any error occurs during sending email, update the reset values in the databse
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save(); 
            return next(new ErrorHandler(error?.message, 500));
        }  
    }
);




// reset password -> /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(

    async (req, res, next) => {

        // get the reset token from the req params of the url
        const resetPasswordToken = req?.params?.token;

        // hash the reset token
        const hashedResetPasswordToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');

        // find the user with the matching hashedResetPasswordToken and resetPasswordExpire (should be greater than current time)
        const user = await userModel.findOne({ 
            resetPasswordToken : hashedResetPasswordToken,
            resetPasswordExpire : { $gt : Date.now() },
        });

        // if no user is found, return the message to the user
        if(!user) {
            return next(new ErrorHandler("Reset Password Token is either invalid or has been expired", 400));
        }

        // if user is found then, first check if the password is same as confirm password
        if(req.body.password != req.body.confirmPassword) {
            return next(new ErrorHandler("Passwords do not match", 400));
        }

        // update the password
        user.password = req.body.password;

        // update the reset password token and reset expiry date after resetting the password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // update the user in the database 
        await user.save();
        
        // send the new jwt token to the user
        sendTokenToUser(user, 200, res);
    }

);






/**
 *  
 * User routes
 * 
 */





// get user profile -> /api/v1/me
export const getUserProfile = catchAsyncErrors(
    async (req, res, next) => {

        // get the user's information based on the id
        const user = await userModel.findById(req?.user?._id);

        // send the user's information to the user
        res.status(200).json({
            user,
        });
    }
);




// update password -> /api/v1/password/update
export const updatePassword = catchAsyncErrors(
    async (req, res, next) => {
        // get oldPassword and newPassword from the request body
        const { oldPassword, newPassword } = req.body;

        // if old password or new password not provided
        if(!oldPassword || !newPassword) {
            return next(new ErrorHandler('please enter valid old password and new password', 400));
        }

        // get the current logged in user's information based on the id
        const user = await userModel.findById(req?.user?._id).select("+password");

        // compare if the old password matches with the saved password
        const isPasswordCorrect = await user.comparePassword(oldPassword);
        
        // if entered oldpassword is incorrect then send the error message to the user
        if(!isPasswordCorrect) {
            return next(new ErrorHandler('old password is incorrect', 400));
        }

        // if it is correct then update the password in the database
        user.password = newPassword;
        await user.save();

        // after updating the password send the response to the user
        res.status(200).json({
            success : true,
        });        
    }
);






// get user profile -> /api/v1/me/update
export const updateProfile = catchAsyncErrors(
    async (req, res, next) => {

        // if new values not found
        if(!req.body.name || !req.body.email) {
            return next(new ErrorHandler("please enter name and email", 400));
        }

        // prepare the user data before udating
        const newUserData = {
            name : req.body?.name,
            email : req.body?.email,
        }

        // update the user info. in the database
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, newUserData, {new : true});

        // send the response to the user along with updated values
        res.status(200).json({
            updatedUser,
        });
    }
);






/**
 *  Admin Routes
 */



// get all users (admin route) :-    /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(
    async (req, res, next) => {
        // get all users from the database
        const users = await userModel.find();

        // send the response to the admin
        res.status(200).json({
            users,
        });
    }
)



// get user details (admin route) :-    /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(
    async (req, res, next) => {
        // get all users from the database
        const user = await userModel.findById(req.params.id);

        // if user not found
        if(!user) {
            return next(new ErrorHandler(`User not found with the id : ${req.params.id}`, 404));
        }

        // send the response to the admin
        res.status(200).json({
            user,
        });
    }
);








// update user details -> /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(
    async (req, res, next) => {

        // if updated values are not provided
        if(!req.body.name || !req.body.email || !req.body.role) {
            return next(new ErrorHandler("please enter name, email and role", 400));
        }

        // prepare the user data before udating
        const newUserData = {
            name : req.body?.name,
            email : req.body?.email,
            role : req.body?.role,
        }

        // find the user with this id
        const user = await userModel.findById(req.params.id);

        // if user not found
        if(!user) {
            return next(new ErrorHandler(`User not found with the id : ${req.params.id}`, 404));
        }

        // otherwise, find user by id and update user data in the database
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, newUserData, {new : true});

        // finally, send the confirmation
        res.status(200).json({
            updatedUser,
        });
       
    }
);






// get user details (admin route) :-    /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(
    async (req, res, next) => {
        // get all users from the database
        const user = await userModel.findById(req.params.id);

        // if user not found
        if(!user) {
            return next(new ErrorHandler(`User not found with the id : ${req.params.id}`, 404));
        }


        // todo -> also delete the user details from cloudinary


        // finally delete user from the database
        await userModel.deleteOne(user);

        // send the response to the admin
        res.status(200).json({
            success : true,
        });
    }
);