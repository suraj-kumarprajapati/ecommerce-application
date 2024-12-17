import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendTokenToUser from "../utils/sendTokenToUser.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";




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
    
)











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
