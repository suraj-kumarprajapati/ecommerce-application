import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import StarRatings from "react-star-ratings";
import Loader from "../layouts/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProductDetails() {
  // this will handle the active image url
  const [activeImageUrl, setActiveImageUrl] = useState("");

  // fetch product data start
  const params = useParams();
  const { data, isLoading, isError, error } = useGetProductDetailsQuery(
    params.id
  );

  const product = data?.product;
  console.log(product);
  // fetch product data end

  // set the activeImageUrl
  useEffect(() => {
    if (product?.images[0]) setActiveImageUrl(product?.images[0]?.url);
    else setActiveImageUrl("/images/default_product.png");
  }, [product]);

  // if error occurs
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  // if product is still loading
  if (isLoading) {
    return <Loader />;
  }

  // define changeActiveImageUrl
  const changeActiveImageUrl = (image) => {
    return () => {
      setActiveImageUrl(image.url);
    };
  };


  // if product not found
  if(!product) {
    return (
        <h1>Product Not Found</h1>
    )
  }

  return (
    <>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="p-3">
            <img
              className="d-block w-100"
              src={activeImageUrl}
              alt={product?.name}
              width="340"
              height="390"
            />
          </div>
          <div className="row justify-content-start mt-5">
            {product?.images?.map((image, index) => (
              <div className="col-2 ms-4 mt-2" key={index}>
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer ${
                      image.url === activeImageUrl ? "border-warning" : ""
                    }`}
                    height="100"
                    width="100"
                    src={image?.url}
                    alt={image?.url}
                    onClick={changeActiveImageUrl(image)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3>
          <p id="product_id">{`Product Id : ${product?._id}`}</p>

          <hr />

          {/* product ratings and reviews start  */}
          <div className="d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />

            <span id="no-of-reviews" className="pt-1 ps-2">
              {`(${product?.numOfReviews})`}
            </span>
          </div>
          {/* product ratings and reviews end  */}

          <hr />

          {/* product price start  */}
          <p id="product_price">{`$${product?.price}`}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus">-</span>
            <input
              type="number"
              className="form-control count d-inline"
              value="1"
              readonly
            />
            <span className="btn btn-primary plus">+</span>
          </div>
          {/* product price end  */}

          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ms-4"
            disabled=""
          >
            Add to Cart
          </button>

          <hr />

          {/* in stock info start  */}
          <p>
            Status:{" "}
            <span
              id="stock_status"
              className={product?.stock > 0 ? "greenColor" : "redColor"}
            >
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          {/* in stock info end  */}

          <hr />

          {/* product description start  */}
          <h4 className="mt-2">Description</h4>

          <p>{product?.description}</p>
          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{product?.seller}</strong>
          </p>
          {/* product description end  */}

          <div className="alert alert-danger my-5" type="alert">
            Login to post your review.
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
