import mongoose, { Mongoose } from "mongoose";


const productSchema = mongoose.Schema({

    name : {
        type : String,
        required : [true, "Please type a product name"],
        maxLength : [200, "Product name cannot exceed 200 characters"],
    },
    price : {
        type : Number,
        required : [true, "Please enter product price"],
        maxLength : [5, "Product price can not exceed 5 digits"],
    },
    description : {
        type : String,
        required : [true, "Please enter product description"],
    },
    ratings : {
        type : Number,
        default : 0,
    },
    images : [
        {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
        },
    ],
    category : {
        type : String,
        required : [true, "Please enter product category"],
        enum : {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Sports",
                "Outdoor",
                "Home",
              ],
            message : "Please select correct category",
        },
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"],
    },
    stock : {
        type : Number,
        required : [true, "Please provide product stock information"]
    },
    numOfReviews : {
        type : Number,
        default : 0,
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            rating : {
                type : Number,
                required : true,
                comment: {
                    type: String,
                    required: true,
                },
            },
        },
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    

}, {timestamps : true});





const productModel =  mongoose.model("Product", productSchema);
export default productModel;