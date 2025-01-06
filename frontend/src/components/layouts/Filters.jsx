import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";


function Filters() {

    // state to manage the minimum and maximum price
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    // get the search params
    const [searchParams] = useSearchParams();

    // get the navigato
    const navigate = useNavigate();

    // handle the price form on form submission
    const handlePriceSumbit = (e) => {
        // prevent the default behaviour
        e.preventDefault();

        // filtering based only on min price
        if(minPrice && !maxPrice) {
            if(!searchParams.has('min')) {
                searchParams.append('min', minPrice);
            }
            else {
                searchParams.set('min', minPrice);
            }

            if(searchParams.has('max')) {
                searchParams.delete('max');
            }
        }

        // filtering based only on max price
        if(maxPrice && !minPrice) {
            if(!searchParams.has('max')) {
                searchParams.append('max', maxPrice);
            }
            else {
                searchParams.set('max', maxPrice);
            }

            if(searchParams.has('min')) {
                searchParams.delete('min');
            }
        }

        // filtering based on min price and max price
        if(minPrice && maxPrice) {
            // throw an error message and return
            if(minPrice > maxPrice) {
                toast.error('Min and Max Price is not valid');
                return;
            }
                

            if(!searchParams.has('min')) {
                searchParams.append('min', minPrice);
            }
            else {
                searchParams.set('min', minPrice);
            }


            if(!searchParams.has('max')) {
                searchParams.append('max', maxPrice);
            }
            else {
                searchParams.set('max', maxPrice);
            }
        }

        // finally set page = 1
        searchParams.set('page', 1);
    
        // create updated path
        const path = window.location.pathname + "?" + searchParams.toString();

        // navigate to the path
        navigate(path);      
    }




  return (
    <>
      <div className="border p-3 filter">
        <h3>Filters</h3>
        <hr />
        <h3 className="filter-heading mb-3">Price</h3>

        {/* price filter start  */}
        <form
          id="filter_form"
          className="px-2"
          onSubmit={handlePriceSumbit}
        >
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
              <button 
                type="submit" 
                className="btn btn-primary"
            >
                GO
              </button>
            </div>
          </div>
        </form>
        {/* price filter end  */}

        <hr />
        <h3 className="mb-3">Category</h3>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value="Category 1"
          />
          <label className="form-check-label" htmlFor="check4">
            {" "}
            Category 1{" "}
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check5"
            value="Category 2"
          />
          <label className="form-check-label" htmlFor="check5">
            {" "}
            Category 2{" "}
          </label>
        </div>

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
