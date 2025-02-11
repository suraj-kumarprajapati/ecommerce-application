import { useEffect, useState } from "react";
import Metadata from "../layouts/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import caluclateOrderCost from "../../helpers/calcBill";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {


    const [method, setMethod] = useState("");

    const {cartItems, shippingInfo} = useSelector(state => state.cart);
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = caluclateOrderCost(cartItems);

    const navigate = useNavigate();

    const [createNewOrder, {isSuccess, isError, error, data, isLoading}] = useCreateNewOrderMutation();


    useEffect(() => {

        if(isError) {
            toast.error(error?.data?.message);
        }

        if(isSuccess) {
            toast.success("order successfull");
            console.log(data);
            navigate("/");
        }


    }, [isError, error, navigate, isSuccess, data])




    const submitHandler = (e) => {
        e.preventDefault();

        if(method === "") {
            toast.error("Please select a payment method");
            return;
        }

        if(isLoading) {
            toast.loading("loading");
        }

        if(method === "Cash On Delivery") {
            // cash on delivery
            alert("Cash On Delivery");

            const orderData = {
                shippingInfo,
                orderItems : cartItems,
                itemsPrice,
                shippingAmount : shippingPrice,
                taxAmount : taxPrice,
                totalAmount : totalPrice, 
                paymentInfo : "Not Paid",
                paymentMethod : "Cash On Delivery",
            }

            createNewOrder(orderData);
        }

        if(method === "Card") {
            // card
            alert("Card");
        }
    }

  return (
    <>
      <Metadata title="Payment Method" />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="Cash On Devlivery"
                onClick={(e) => setMethod("Cash On Delivery")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onClick={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
