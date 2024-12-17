import mongoose from "mongoose";



export const connectDatabase = () => {

    let DB_URI = "";  
    if(process.env.NODE_ENV == 'DEVELOPMENT')
        DB_URI = process.env.DB_LOCAL_URI;
    if(process.env.NODE_ENV == 'PRODUCTION') 
        DB_URI = process.env.DB_URI;

        
    // connect to database
    mongoose.connect(DB_URI).then((con) => {
        console.log(`MongoDB connected with HOST ${con?.connection?.host}`);
    });
} 