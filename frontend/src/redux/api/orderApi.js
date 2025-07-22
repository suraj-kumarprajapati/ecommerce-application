



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const orderApi = createApi({

    reducerPath : "orderApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "/api/v1"
    }),

    keepUnusedDataFor : 30,

    endpoints: (builder) => ({
        createNewOrder : builder.mutation({
            query(body) {
                return {
                    url : "/orders/new",
                    method : "POST",
                    body : body,
                }
            }
        }),

        getDashboardSales : builder.query({
            query : ({startDate, endDate}) => `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
        }),

        
    }),

});



// export this hook for using in the components
export const  { useCreateNewOrderMutation, useLazyGetDashboardSalesQuery } = orderApi;
