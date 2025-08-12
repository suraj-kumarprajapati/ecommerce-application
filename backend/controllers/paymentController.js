import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// create stripe payment checkout session => /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req.body;

    // items details
    const standard_tax_rate = "txr_1Rqec6FmlgHqCXfuP7mL34KS";
    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: item?.price * 100, // Price in smallest currency unit (paise) (e.g., 1000 for ₹10.00)
        },
        tax_rates: [standard_tax_rate],
        quantity: item?.quantity,
      };
    });

    // shipping details
    const standard_rate = "shr_1RqeOvFmlgHqCXfusbfxGKQT";
    const free_shipping_rate = "shr_1RqePaFmlgHqCXfudG794RNa";
    const shipping_rate =
      body?.itemsPrice >= 1000 ? free_shipping_rate : standard_rate;
    const shippingInfo = body?.shippingInfo;

    // create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      currency: "inr",
      metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items: line_items,
    });

    console.log("=====================");
    console.log(session);
    console.log("=====================");

    res.status(200).json({
      url: session.url,
    });
  }
);

// extract order items
const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.map(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

// stripe webhook endpoint -> /api/v1/payment/webhook
// this creates new order after payment
export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  

  try {
    // get the signature
    const signature = req.headers["stripe-signature"];

    // create the event
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;
      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;
      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        state : session.metadata.state,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };

      const order = await orderModel.create(orderData);
      res.status(200).json({
        success: true,
        message: "order completed...",
        order: order,
      });
    }
  } catch (error) {
    console.log("==========================");
    console.log("Error => ", error);
    console.log("==========================");
    res.status(400).json({
      success: false,
      message: "order is being processed...",
    });
  }
});
