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