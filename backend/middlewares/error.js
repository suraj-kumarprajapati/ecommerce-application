import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode : err?.statusCode || 500,
        message : err?.message || "Internal Server Error",
    };


    // handle the validationError
    if(err.name === "ValidationError") {
        // receiving multiple validation erros in the form of array
        const validatorErrors = Object.values(err.errors);
        
        // array
        const messages = validatorErrors.map(val => val.message);
        
        const message = messages;  // message will be passed as a string
        
        error = new ErrorHandler(message, 400);
    }


    // handle the invalid mongoose id error
    if(err.name === "CastError") {
        const message = `Resource not found! Invalid ${err.path} `;
        error = new ErrorHandler(message, 404);
    }


    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
        error = new ErrorHandler(message, 400);
    }

    // Handle wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try Again!!!`;
        error = new ErrorHandler(message, 400);
    }

    // Handle expired JWT Error
    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token is expired. Try Again!!!`;
        error = new ErrorHandler(message, 400);
    }


    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
            message : error.message,
            error : err,
            stack : err?.stack,
        });
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
            message : error.message,
        });
    } 

};