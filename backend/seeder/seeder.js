
import mongoose from 'mongoose';
import products from './data.js';
import productModel from '../models/productModel.js';


const seedProducts = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/udemyECommerce");

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

