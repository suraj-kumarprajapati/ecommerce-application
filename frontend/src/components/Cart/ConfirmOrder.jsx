import Metadata from "../layouts/Metadata";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import caluclateOrderCost from "../../helpers/calcBill";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = caluclateOrderCost(cartItems);


  

  return (
    <>
      <Metadata title={"Confirm Order"} />

      <CheckoutSteps  shipping confirmOrder /> 

      <div className="row d-flex justify-content-between">
        {/* shipping info  */}
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address : </b>
            {shippingInfo?.address},{shippingInfo?.city},{" "}
            {shippingInfo?.state}, 
            {shippingInfo?.zipCode}, 
            {shippingInfo?.country}
          </p>

          <hr />

          {/* cart details  */}
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => {
            return (
              <div key={item?.product}>
                <hr />
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item?.image}
                        alt="item"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/products/${item?.product}`}>
                        {item?.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item?.quantity} x {`$${item?.price}`} ={" "}
                        <b>${(item?.quantity * item?.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>

          {/* bill amount  */}
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">₹1499.97</span>
            </p>
            <p>
              Shipping: <span className="order-summary-values">₹10.00</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">₹150.00</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">₹1659.97</span>
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
