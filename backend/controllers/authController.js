import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendTokenToUser from "../utils/sendTokenToUser.js";




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