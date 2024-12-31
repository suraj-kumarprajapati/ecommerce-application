import { useGetProductsQuery } from "../redux/api/productApi";
import Metadata from "./layouts/Metadata";
import ProductItem from "./product/ProductItem";

function Home() {
  const { data, error, isLoading } = useGetProductsQuery();

  const productsList = data;
  console.log(productsList);

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
