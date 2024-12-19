import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import orderModel from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";




// new order -> /api/v1/orders/new
export const newOrder = catchAsyncErrors(
    async (req, res, next) =>  {

        // extract order info. from the req body
        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemsPrice,
            taxAmount,
            shippingAmount, 
            totalAmount,
        } = req.body;





        // now create a new order
        const newOrder = await orderModel.create({
            shippingInfo,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemsPrice,
            taxAmount,
            shippingAmount, 
            totalAmount,
            user : req.user._id,
        });


        // send the response to the user after successfull order
        res.status(200).json({
            newOrder,
        });
    }
);




// get order details by order id -> /orders/:id
export const getOrderDetails = catchAsyncErrors(

    async (req, res, next) => {
        // find orders based on id
        const order = await orderModel.findById(req.params.id).populate( {
            path : "user", 
            select : "name email"
        }).populate({
            path : "orderItems",
            populate : {
                path : "product",
            }
        });

        // if order not found in the database
        if(!order) {
            return next(new ErrorHandler(`No Order found with the id : ${req.params.id}`, 404));
        }

        // otherwise, send response to the user after successfull retrieval of order details
        res.status(200).json({
            order,
        });
    }

);








// get order details of the current user -> /me/orders
export const getMyOrders = catchAsyncErrors(

    async (req, res, next) => {
        // find orders based on id
        const orders = await orderModel.find({ user : req.user._id });

        // send orders to the user
        res.status(200).json({
            orders,
        });
    }

);