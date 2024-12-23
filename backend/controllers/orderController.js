import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
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





// delete order by order id -> /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(

    async (req, res, next) => {
        // find orders based on id
        const order = await orderModel.findById(req.params.id);

        // if order not found in the database
        if(!order) {
            return next(new ErrorHandler(`No Order found with the id : ${req.params.id}`, 404));
        }

        // otherwise, delete this order
        await order.deleteOne();

        // otherwise, send response to the user after successfull retrieval of order details
        res.status(200).json({
            success : true,
        });
    }

);




// get all the orders -> api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await orderModel.find();

        // after fetching all the order details from the database send this to the user(admin)
        res.status(200).json({
            orders,
        });
    }
);


// update order by id -> api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(
    async (req, res, next) => {
        // first find order by id
        const order = await orderModel.findById(req.params.id);


        // if order is not found, throw 
        if(!order) {
            return next(new ErrorHandler("No order is found with this id", 404));
        }

        // if the order has been deliverd, user(admin) can't modify this order details
        if(order?.orderStatus === "delivered") {
            return next(new ErrorHandler("Order has been already delivered", 400));
        }

        // after shipping the orders, update the stock count
        // Update products stock
        order?.orderItems?.forEach(async (item) => {
            const product = await productModel.findById(item?.product?.toString());
            if (!product) {
                return next(new ErrorHandler("No Product found with this ID", 404));
            }

            product.stock = product.stock - item.quantity;
            await product.save( { validateBeforeSave: false } );
        });

        order.orderStatus = req.body?.status;
        order.deliveredAt = Date.now();

        console.log("saving order after updating");
        await order.save();
 
        res.status(200).json({
            success: true,
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


