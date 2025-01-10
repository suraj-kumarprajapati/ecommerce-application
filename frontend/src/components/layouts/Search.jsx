import { useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function Search() {

    const [currValue, setCurrValue] = useState("");
    const navigate = useNavigate();
    const [searchParams ] = useSearchParams();

    useEffect(() => {
        setCurrValue(searchParams.get('keyword') || '');

        if(searchParams.has('min')) {
          searchParams.delete('min');
        }
        if(searchParams.has('max')) {
          searchParams.delete('max');
        }
        if(searchParams.has('category')) {
          searchParams.delete('category');
        }
        

        const path = window.location.pathname + '?' + searchParams.toString();
        navigate(path);
    }, [currValue]);

    


    



    

    
    const updateSearchParam = (e) => {
        // set the keyword in the search params
        setCurrValue(e.target.value);

        // set the keyword in the search params
        if(searchParams.has('keyword')) {
            searchParams.set('keyword', e.target.value);
        }
        else {
            searchParams.append('keyword', e.target.value);
        }

        // set the page by default to 1
        if(searchParams.has('page')) {
            searchParams.set('page', 1);
        }   
        else {
            searchParams.append('page', 1);     
        }

        // navigate to the search page
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
    }


    // on submittin the form
    const submitHandler = (e) => {
        // // prevent the default behaviour
        // e.preventDefault();

        // set the keyword in the search params
        setCurrValue(e.target.value);
        
        // set the keyword in the search params
        if(searchParams.has('keyword')) {
            searchParams.set('keyword', e.target.value ? e.target.value : "");
        }
        else {
            searchParams.append('keyword', e.target.value ? e.target.value : "");
        }

        // set the page by default to 1
        if(searchParams.has('page')) {
            searchParams.set('page', 1);
        }   
        else {
            searchParams.append('page', 1);     
        }

        // navigate to the search page
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
    }

  return (
    <>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value = {currValue}
              onChange={ updateSearchParam  }
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
