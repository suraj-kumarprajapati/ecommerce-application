
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const productApi = createApi({

    reducerPath : "productApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "/api/v1"
    }),

    tagTypes : ["Product", "AdminProducts"],

    keepUnusedDataFor : 30,

    endpoints: (builder) => ({
        getProducts : builder.query({
            query : (params) => ({
                url : '/products',
                params : {
                    'page' : params?.page,
                    'keyword' : params?.keyword,
                    'price[gte]' : params?.min,
                    'price[lte]' : params?.max,
                    'category' : params?.category,
                    'ratings[gte]' : params?.ratings,
                }
            }),
        }),

        getProductDetails : builder.query({
            query : (id) => ({
                url : `/products/${id}`,
            }),
            providesTags : ["Product"],
        }),


        getAdminProducts : builder.query({
            query : () => ({
                url : "/admin/products",
            }),
            providesTags : ["AdminProducts"],
        }),

        createProduct : builder.mutation({
            query(body) {
                return {
                    url : "/admin/products",
                    method : "POST",
                    body : body,
                }
            },
            invalidatesTags : ["AdminProducts"],
        }),

        updateProduct : builder.mutation({
            query({id, body}) {
                return {
                    url : `/admin/products/${id}`,
                    method : "PUT",
                    body : body,
                }
            },
            invalidatesTags : ["Product", "AdminProducts"]
        }),

    }),

});



// export this hook for using in the components
export const  { 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useGetAdminProductsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
} = productApi;
