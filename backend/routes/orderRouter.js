
import express from "express";
import { authorizeRoles, isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { getOrderDetails, newOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder, getSales } from "../controllers/orderController.js";


const orderRouter = express.Router();


orderRouter.route('/orders/new').post(isUserAuthenticated, newOrder);
orderRouter.route('/orders/:id').get(isUserAuthenticated, getOrderDetails);
orderRouter.route('/me/orders').get(isUserAuthenticated, getMyOrders);



orderRouter.route('/admin/orders').get(isUserAuthenticated, authorizeRoles("admin"), getAllOrders);
orderRouter.route('/admin/orders/:id').put(isUserAuthenticated, authorizeRoles("admin"), updateOrder);
orderRouter.route('/admin/orders/:id').delete(isUserAuthenticated, authorizeRoles("admin"), deleteOrder);
orderRouter.route("/admin/get_sales").get(isUserAuthenticated, authorizeRoles("admin"), getSales);

export default orderRouter;