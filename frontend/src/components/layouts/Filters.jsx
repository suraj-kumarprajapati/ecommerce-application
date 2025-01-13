import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchParamsAfterPriceFilter } from "../../helpers/filterHelper";
import { categories } from "../../helpers/constants";
import StarRatings from "react-star-ratings";

function Filters() {
  // state to manage the minimum and maximum price
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  // get the search params
  let [searchParams] = useSearchParams();

  // get the navigate method
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has("min")) searchParams.delete("min");

    if (searchParams.has("max")) searchParams.delete("max");

    if (searchParams.has("category")) {
      searchParams.delete("category");
    }

    if (searchParams.has("ratings")) {
      searchParams.delete("ratings");
    }

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  }, []);



  // handle the price form on form submission
  const handlePriceSumbit = (e) => {
    e.preventDefault();

    // get search params after applying price filter
    const updatedSearchParams = getSearchParamsAfterPriceFilter(
      searchParams,
      minPrice,
      maxPrice
    );

    // set the updated search params
    searchParams = updatedSearchParams;

    // create updated path
    const path = window.location.pathname + "?" + searchParams.toString();

    // navigate to the updated path
    navigate(path);
  };

  // handle the category filter
  const handleCheckbox = (e) => {
    // get the current checked checkbox
    const checkbox = e.target;

    // get all the checkboxes based on the name
    const checkBoxes = document.getElementsByName(checkbox.name);

    // check all other checkboxes to false
    checkBoxes.forEach((currCheckbox) => {
      if (currCheckbox !== checkbox) currCheckbox.checked = false;
    });

    // add the current category to the seach params
    if (checkbox.checked === true) {
      if (!searchParams.has(checkbox.name))
        searchParams.append(checkbox.name, checkbox.value);
      else searchParams.set(checkbox.name, checkbox.value);
    } else {
      if (searchParams.has(checkbox.name)) searchParams.delete(checkbox.name);
    }

    // create the path
    const path = window.location.pathname + "?" + searchParams.toString();

    // navigate based on the new path
    navigate(path);
  };

  return (
    <>
      <div className="border p-3 filter">
        <h3>Filters</h3>
        <hr />
        <h3 className="filter-heading mb-3">Price</h3>

        {/* price filter start  */}
        <form id="filter_form" className="px-2" onSubmit={handlePriceSumbit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Min ($)"
                name="min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Max ($)"
                name="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                GO
              </button>
            </div>
          </div>
        </form>
        {/* price filter end  */}

        <hr />

        {/* category filter start  */}
        <h3 className="mb-3">Category</h3>

        {categories.map((category, index) => {
          return (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name="category"
                id="check4"
                value={category}
                onClick={handleCheckbox}
              />
              <label className="form-check-label" htmlFor="check4">
                {category}
              </label>
            </div>
          );
        })}

        {/* category filter end  */}

        <hr />

        {/* ratings filter start  */}
        <h3 className="mb-3">Ratings</h3>

        {[5, 4, 3, 2, 1].map((rating, index) => {
          return (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name="ratings"
                id="check7"
                value={rating}
                onClick={handleCheckbox}
              />
              <label className="form-check-label" htmlFor="check7">
                <span className="star-rating">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    starDimension="15px"
                    starSpacing="3px"
                    numberOfStars={5}
                    name="rating"
                  />
                </span>
              </label>
            </div>
          );
        })}

        {/* ratings filter end  */}
      </div>
    </>
  );
}

export default Filters;
