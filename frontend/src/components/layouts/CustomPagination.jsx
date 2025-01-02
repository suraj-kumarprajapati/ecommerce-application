import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";


function CustomPagination({totalItemsCount, itemsPerPage}) {
    const navigate = useNavigate();

    console.log(totalItemsCount, itemsPerPage)

    // get the current page number from the url
    const [searchParams] = useSearchParams();

    // extract the page number from the search params and if it is not present then set it to 1
    let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;

    // this state will store the current page number
    const [currPage, setCurrPage] = useState(1);

    // whenever the 'page' changes, update the current page number
    useEffect(() => {
        setCurrPage(page);
    }, [page]);

    


    // on chage of the page number after clicking the next or prev button, update the current page number
    const setCurrentPageNumber = (pageNumber) => {
        // set the current page number in the currPage state
        setCurrPage( pageNumber);

        // set teh page params in search params
        if(searchParams.has('page')) {
            searchParams.set('page', pageNumber);
        }
        else {
            searchParams.append('page', pageNumber);
        }
 
        // create the path with the updated page number
        let path =  window.location.pathname  + "?" + searchParams.toString();

        // navigate to the new path
        navigate(path);   
    }

    return (
        <>
            
           {
                totalItemsCount > itemsPerPage && (
                    <Pagination
                        activePage={currPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={totalItemsCount}
                        onChange={ setCurrentPageNumber }

                        prevPageText={"Prev"}
                        nextPageText={"Next"}
                        firstPageText={"First"}
                        lastPageText={"Last"}

                        itemClass={"page-item"}
                        linkClass={"page-link"}
                    />
                )
           }
            
        </>
    );
}

export default CustomPagination;