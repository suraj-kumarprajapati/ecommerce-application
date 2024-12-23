

import express from "express";
import {isUserAuthenticated} from "../middlewares/authMiddleware.js"
import { createProductReview, getAllReviews } from "../controllers/reviewController.js";

const router = express.Router();



router.route('/reviews').put(isUserAuthenticated, createProductReview);
router.route('/reviews/:id').get(isUserAuthenticated, getAllReviews);



export default router;