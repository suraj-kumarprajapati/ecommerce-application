
import mongoose from 'mongoose';
import products from './data.js';
import productModel from '../models/productModel.js';
import dotenv from "dotenv";


// configuration
dotenv.config({path : "backend/config/config.env"});


const seedProducts = async () => {
    
    const DB_URI = process.env.DB_URI;

    try {
        mongoose.connect(DB_URI);

        await productModel.deleteMany();
        console.log("All existing products deleted");

        await productModel.insertMany(products);
        console.log("Products inserted");

        process.exit();
    }
    catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();

