
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const productApi = createApi({

    reducerPath : "productApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "/api/v1"
    }),

    keepUnusedDataFor : 30,

    endpoints: (builder) => ({
        getProducts : builder.query({
            query : (params) => ({
                url : '/products',
            }),
        }),

        getProductDetails : builder.query({
            query : (id) => ({
                url : `/products/${id}`,
            }),
        }),

    }),

});



// export this hook for using in the components
export const  { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
