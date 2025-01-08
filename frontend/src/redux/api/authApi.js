import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";






export const authApi = createApi({

    reducerPath : "authApi",

    baseQuery : fetchBaseQuery({
        baseUrl : '/api/v1',
    }),

    endpoints : (build) => ({
        login : build.mutation({
            query : (body) => ({
                url : '/login',
                method : "POST",
                body : body,
            }),

        }),


        register : build.mutation({
            query : (body) => ({
                url : '/register',
                method : "POST",
                body : body,
            }),

        }),
    }),

})




export const { useLoginMutation, useRegisterMutation } = authApi;