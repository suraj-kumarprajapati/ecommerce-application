import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getSearchParamsAfterPriceFilter } from "../../helpers/filterHelper";
import { categories } from "../../helpers/constants";

function Filters() {

  // state to manage the minimum and maximum price
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  // get the search params
  let [searchParams] = useSearchParams();

  // get the navigato
  const navigate = useNavigate();

  // handle the price form on form submission
  const handlePriceSumbit = (e) => {
    // prevent the default behaviour
    e.preventDefault();

    // get search params after applying price filter
    searchParams = getSearchParamsAfterPriceFilter(
      searchParams,
      minPrice,
      maxPrice,
      toast
    );

    // create updated path
    const path = window.location.pathname + "?" + searchParams.toString();

    // navigate to the path
    navigate(path);
  };


  // handle the category filter
  const handleCategory = (e) => {
    // get the current checked checkbox
    const checkbox = e.target;

    console.log(e);

    // get all the checkboxes based on the name
    const checkBoxes = document.getElementsByName(checkbox.name);

    // check all other checkboxes to false
    checkBoxes.forEach((currCheckbox) => {
        if(currCheckbox !== checkbox)
            currCheckbox.checked = false;
    });

    // add the current category to the seach params
    if(checkbox.checked === true)  {
        if(!searchParams.has('category'))
            searchParams.append('category', checkbox.value);
        else
            searchParams.set('category', checkbox.value); 
    }
    else {
        if(searchParams.has('category'))
            searchParams.delete('category');
    }
    
    // create the path
    const path = window.location.pathname + "?" + searchParams.toString();
    
    // navigate based on the new path
    navigate(path);
  }

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

        {
            categories.map((category, index) => {
            return (
                <div className="form-check" key={index}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="category"
                    id="check4"
                    value={category}
                    onClick={handleCategory}
                />
                <label className="form-check-label" htmlFor="check4">
                    {category}
                </label>
                </div>
            );
        })}

        {/* category filter end  */}

        <hr />
        <h3 className="mb-3">Ratings</h3>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value="5"
          />
          <label className="form-check-label" htmlFor="check7">
            <span className="star-rating">★ ★ ★ ★ ★</span>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check8"
            value="4"
          />
          <label className="form-check-label" htmlFor="check8">
            <span className="star-rating">★ ★ ★ ★ ☆</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Filters;
