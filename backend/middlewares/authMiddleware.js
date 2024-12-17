import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncError.js";
import userModel from "../models/userModel.js";



// it checks if the user is authenticated or not
export const isUserAuthenticated = catchAsyncErrors(

    async (req, res, next) => {
        // get the login token
        const { token } = req.cookies;
    
        // if token is not present, user is unauthorised
        if(!token) {
            return next(new ErrorHandler("Login first to access this resource", 401)); 
        }
    
        // if token is present then verify it it is valid or not
        const decodedTokenValue = jwt.verify(token, process.env.JWT_SECRET)
    
        // extract user id from the decodedTokenValue
        const id = decodedTokenValue?.id;
    
        // find the user based on the id
        const user = await userModel.findById(id);

        if(!user) {
            return next(new ErrorHandler("invalid user", 401));
        }
        
        // set this user in the req object
        req.user = user;
    
        // go to the next function
        next();
    }
)




// authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role {${req.user.role}} is not allowed to access this resource`, 403));
        }
 
        next();
    }
}