
// import dependencies
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import {connectDatabase} from "./config/dbConnect.js"
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";



// import all routes
import productRoutes from "./routes/productRouter.js"
import authRouter from "./routes/authRouter.js";
import orderRouter from "./routes/orderRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import paymentRouter from "./routes/paymentRoute.js";
import { fileURLToPath } from "url";


// handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR ${err}`);
    console.log("Shutting down server due to uncaught exceptions");
    process.exit(1);
});



const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV; 

 

const app = express(); 

// connect to database b
connectDatabase(); 


// middlewares
app.use(express.json({
    limit : "10mb",
    verify : (req, res, buf) => {
        req.rawBody = buf.toString();
    },
}));  
app.use(express.text());
app.use(express.query());
app.use(cookieParser());


// routes 
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", paymentRouter);


// serve frontend as static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}


// use this middleware after the routes middlewares
app.use(errorMiddleware);   // error middleware




// start the server at port : PORT
const server = app.listen(PORT, () => {
    console.log(`App started at port no : ${PORT} in ${NODE_ENV} mode.`);
}); 



// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`ERROR ${err}`);
    console.log("Shutting down server due to unhandled promise rejections");
    server.close(() => {
        process.exit(1); 
    })
});