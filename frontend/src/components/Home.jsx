import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/productApi";
import Loader from "./layouts/Loader";
import Metadata from "./layouts/Metadata";
import ProductItem from "./product/ProductItem";
import toast from "react-hot-toast";

function Home() {
  const { data, error, isLoading, isError } = useGetProductsQuery();

  // store the products list 
  const productsList = data;

  // if error occurs
  useEffect(() => {
    if(isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  


  // while data is being loaded 
  if(isLoading)
    return (
      <Loader />
    )


  return (
    <>
      <Metadata title={"Buy Best Products Online"} />

      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {
                productsList?.products?.map((product, index) => (
                  <ProductItem product={product} key={index} />
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
