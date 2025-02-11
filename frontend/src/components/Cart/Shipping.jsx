import { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Metadata from "../layouts/Metadata";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const countriesList = Object.values(countries);

  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
      setState(shippingInfo?.state);
    }
  }, [shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!address || !zipCode || !city || !phoneNo || !country || !state) {
      toast.error("Please fill in all the fields");
      return;
    }

    const formData = {
      address,
      city,
      zipCode,
      phoneNo,
      country,
      state,
    };

    dispatch(saveShippingInfo(formData));

    navigate("/confirm_order");
  };

  return (
    <>
      {/* title metadata  */}
      <Metadata title={"Shipping Info"} />

      <CheckoutSteps  shipping />

      {/* shipping form  */}
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Shipping Info</h2>

            {/* address field start */}
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            {/* address field end  */}

            {/* city field start  */}
            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            {/* city field end  */}



            {/* state field start  */}
            <div className="mb-3">
              <label htmlFor="state_field" className="form-label">
                State
              </label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            {/* state field end  */}

            {/* phone field start  */}
            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            {/* phone field end  */}

            {/* postal code field start  */}
            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">
                Postal Code
              </label>
              <input
                type="text"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            {/* postal code field end  */}

            {/* country field start  */}
            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Country
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => {
                  return (
                    <option value={country?.name} key={country?.name}>
                      {country?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* country field end  */}

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
