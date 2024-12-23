
import mongoose from "mongoose";


// create order schema    
const orderSchema = mongoose.Schema({

    shippingInfo : {
        address : {
            type : String,
            required : true,
        },

        city : {
            type : String,
            required : true,
        },

        state : {
            type : String,
            required : true,
        },

        country : {
            type : String,
            required : true,
        },

        zipCode : {
            type : Number,
            required : true,
        },

        phoneNo : {
            type : String, 
            requred : true,
        },
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    orderItems : [
        {
            name : {
                type : String,
                required : true,
            },

            quantity : {
                type : Number,
                required : true,
            },

            price : {
                type : Number,
                required : true,
            },

            image : {
                type : String,
                required : true,
            },

            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true,
            },
        },
    ],

    paymentMethod : {
        type : String,
        enum : {
            values : ["Cash On Delivery", "Card"],
            default : "Please select one payment method",
        },
    },

    paymentInfo : {
        id : String,
        status : String,
    },

    itemsPrice : {
        type : Number,
        required : true,
    },

    taxAmount: {
        type: Number,
        required: true,
    },

    shippingAmount: {
        type: Number,
        required: true,
    },

    totalAmount: {
        type: Number,
        required: true,
    },

    orderStatus : {
        type : String,
        enum : {
            values : ["processing", "shipped", "delivered"],
            message : "Please select correct order status",
        },
        default : "processing",
    },

    deliveredAt : Date,

}, {timestamps : true} );




// export the order model
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;