
import express from "express";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { getOrderDetails, newOrder, getMyOrders } from "../controllers/orderController.js";


const orderRouter = express.Router();


orderRouter.route('/orders/new').post(isUserAuthenticated, newOrder);
orderRouter.route('/orders/:id').get(isUserAuthenticated, getOrderDetails);
orderRouter.route('/me/orders').get(isUserAuthenticated, getMyOrders);


export default orderRouter;