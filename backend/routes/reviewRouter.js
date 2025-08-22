

import express from "express";
import {authorizeRoles, isUserAuthenticated} from "../middlewares/authMiddleware.js"
import { canUserReview, createProductReview, deleteReview, getAllReviews } from "../controllers/reviewController.js";

const router = express.Router();


// user route
router.route('/reviews').put(isUserAuthenticated, createProductReview);
router.route('/reviews/:id').get(isUserAuthenticated, getAllReviews);
router.route("/can_review").get(isUserAuthenticated, canUserReview);


// admin routes
router.route("/admin/reviews").delete(isUserAuthenticated, authorizeRoles("admin"), deleteReview);




export default router;