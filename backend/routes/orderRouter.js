
import express from "express";
import { authorizeRoles, isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { getOrderDetails, newOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";


const orderRouter = express.Router();


orderRouter.route('/orders/new').post(isUserAuthenticated, newOrder);
orderRouter.route('/orders/:id').get(isUserAuthenticated, getOrderDetails);
orderRouter.route('/me/orders').get(isUserAuthenticated, getMyOrders);



orderRouter.route('/admin/orders').get(isUserAuthenticated, authorizeRoles("admin"), getAllOrders);
orderRouter.route('/admin/orders/:id').put(isUserAuthenticated, authorizeRoles("admin"), updateOrder);
orderRouter.route('/admin/orders/:id').delete(isUserAuthenticated, authorizeRoles("admin"), deleteOrder);

export default orderRouter;