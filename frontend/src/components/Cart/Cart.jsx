import Metadata from "../layouts/Metadata";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";


function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) {
        toast.error("Quantity cannot exceed stock quantity");
        return;
    }

    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
        toast.error("Quantity cannot be less than 1");
        return
    };

    setItemToCart(item, newQty);
  }; 

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };


  if (cartItems.length === 0) {
    <Metadata title={"Your Cart"} />;
    return <h2 className="mt-5">Your Cart is Empty</h2>;
  }

  return (
    <>
      <Metadata title={"Your Cart"} />

      <h2 className="mt-5">
        Your Cart: <b>{cartItems?.length} items</b>
      </h2>

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {/* Cart Items  */}

          {cartItems.map((item) => {
            return (
              <div className="cart-item" data-key="product1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={item?.image}
                      alt="Product Image"
                      height="90"
                      width="115"
                    />
                  </div>
                  <div className="col-5 col-lg-3">
                    <a href="/products/product1"> {item?.name} </a>
                  </div>
                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">{item?.price}</p>
                  </div>
                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <span
                        className="btn btn-danger minus"
                        onClick={() => decreseQty(item, item?.quantity)}
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item?.quantity}
                        readOnly
                      />
                      <span
                        className="btn btn-primary plus"
                        onClick={() => increseQty(item, item?.quantity)}
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    <i
                      id="delete_cart_item"
                      className="fa fa-trash btn btn-danger"
                      onClick={() => removeCartItemHandler(item?.product)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}

          <hr />

          <hr />

          {/* Add more cart items  */}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Units : <span className="order-summary-values">
              {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
              (Units)
                 
                </span>
            </p>
            <p>
              Est. total: <span className="order-summary-values">
                $
                {cartItems
                      ?.reduce(
                        (acc, item) => acc + item?.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                </span>
            </p>
            <hr />
            <button id="checkout_btn" className="btn btn-primary w-100">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
