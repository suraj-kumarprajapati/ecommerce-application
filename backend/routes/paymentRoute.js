import express from "express";
const paymentRouter = express.Router();

import { isUserAuthenticated } from "../middlewares/authMiddleware.js";
import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";

paymentRouter
  .route("/payment/checkout_session")
  .post(isUserAuthenticated, stripeCheckoutSession);

paymentRouter.route("/payment/webhook").post(stripeWebhook);

export default paymentRouter;
