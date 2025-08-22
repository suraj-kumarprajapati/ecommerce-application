import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import {
  useGetAdminProductsQuery,
} from "../../redux/api/productApi";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../layouts/Loader";
import Metadata from "../layouts/Metadata";

const ListProducts = () => {
  const { data : productsData, isLoading : AreProductsLoading, error : isFetchError } = useGetAdminProductsQuery();

//   const [
//     deleteProduct,
//     { isLoading: isDeleteLoading, error: deleteError, isSuccess },
//   ] = useDeleteProductMutation();


    // if error occurs while loading products data
    useEffect(() => {
        if(isFetchError) {
            toast.error(isFetchError?.data?.message);
        }
    }, [isFetchError])


//   useEffect(() => {
//     if (deleteError) {
//       toast.error(deleteError?.data?.message);
//     }

//     if (isSuccess) {
//       toast.success("Product Deleted");
//     }
//   }, []);

//   const deleteProductHandler = (id) => {
//     deleteProduct(id);
//   };

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    productsData?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name?.substring(0, 20)}...`,
        stock: product?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
            //   onClick={() => deleteProductHandler(product?._id)}
            //   disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return products;
  };

  if (AreProductsLoading) return <Loader />;

  return (
    <AdminLayout>
      <Metadata title={"All Products"} />

      <h1 className="my-5">{productsData?.products?.length} Products</h1>

      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListProducts;