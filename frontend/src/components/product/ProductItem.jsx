import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

function ProductItem({ product }) {
  return (
    <>
      {/* Product Item Start  */}
      <div className="col-sm-12 col-md-6 col-lg-3 my-3">
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src={product?.images[0]?.url}
            alt={product?.name}
          />
          <div className="card-body ps-3 d-flex justify-content-center flex-column">
            <h5 className="card-title fw-bold">
              <Link to={`/products/${product?._id}`}>{product?.name}</Link>
            </h5>

            {/* Reviews and Ratings Start */}
            <div className="ratings mt-auto d-flex">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
              />

              <span id="no_of_reviews" className="pt-2 ps-2">
                {" "}
                ({product?.numOfReviews}){" "}
              </span>
            </div>
            {/* Reviews and Ratings End */}

            {/* price start  */}
            <p className="card-text mt-2">{`$${product?.price}`}</p>
            {/* price end  */}

            {/* view details button start  */}
            <Link
              to={`/products/${product?._id}`}
              id="view_btn"
              className="btn btn-block"
            >
              View Details
            </Link>
            {/* view details button end  */}
          </div>
        </div>
      </div>
      {/* End Product Item End  */}
    </>
  );
}

export default ProductItem;
