import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/productApi";
import Loader from "./layouts/Loader";
import Metadata from "./layouts/Metadata";
import ProductItem from "./product/ProductItem";
import toast from "react-hot-toast";
import CustomPagination from "./layouts/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layouts/Filters";





function Home() {
  // get the search params from the url
  const [searchParams] = useSearchParams();

  // fetch the page number from the search params
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get('keyword');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const category = searchParams.get('category');
  const ratings = searchParams.get('ratings');


  // make the params object
  let params = {
    page: page,
    keyword : keyword ? keyword : "",

  };

  // if min price exists
  if(min) {
    params = {...params, min : min}
  }

  // if max price exists
  if(max) {
    params = {...params, max : max}
  }

  if(category) {
    params = {...params, category : category}
  }

  if(ratings) {
    params = {...params, ratings};
  }

  // fetch the products based on the params
  const { data, error, isLoading, isError } = useGetProductsQuery(params);

  // store the products list
  const productsList = data;
  console.log(productsList);

  // if error occurs
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  // while data is being loaded
  if (isLoading) return <Loader />;

  return (
    <>
      <Metadata title={"Buy Best Products Online"} />

      <div className="row">

        {/* Filter section start  */}
        {
          keyword && (
            <div className={"col-md-3 col-sm-6 col-12 my-4"}>
              <Filters />
            </div>
          )
        }    
        {/* Filter section end     */}


        <div className={keyword ? "col-12 col-sm-6 col-md-9" : "col-12-col-sm-6 sol-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            { keyword ? 
              `Total Products found : ${productsList?.filteredProductsCount},  
              Current Page Products Count : ${productsList?.currPageFilteredProductsCount}`
              : 'Latest Products' 
            }
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {productsList?.products?.map((product, index) => (
                <ProductItem product={product} key={index} />
              ))}
            </div>
          </section>

          {/* Pagination section start */}
          <div className="d-flex justify-content-center my-5">
            <CustomPagination
              totalItemsCount={productsList.filteredProductsCount}
              itemsPerPage={productsList.resultsPerPage}
            />
          </div>
          {/* Pagination section end */}
        </div>
      </div>
    </>
  );
}

export default Home;
