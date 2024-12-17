import express from "express";
import { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct } from "../controllers/productController.js";
import {isUserAuthenticated, authorizeRoles} from "../middlewares/authMiddleware.js"

const router = express.Router();


// normal user
router.route("/products").get(isUserAuthenticated, authorizeRoles("user", "admin"), getProducts);
router.route("/products/:id").get(isUserAuthenticated, authorizeRoles("user", "admin"), getProductDetails); 


// admin 
router.route("/admin/products").post(isUserAuthenticated, authorizeRoles("admin"), newProduct);
router.route("/admin/products/:id").put(isUserAuthenticated, authorizeRoles("admin"), updateProduct); 
router.route("/admin/products/:id").delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct); 

 
export default router;  