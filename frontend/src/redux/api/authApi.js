import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";






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


            async onQueryStarted (args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(userApi.endpoints.getMyProfile.initiate(null));
                }
                catch(error) {
                    console.log(error);
                }
            }

        }),


        register : build.mutation({
            query : (body) => ({
                url : '/register',
                method : "POST",
                body : body,
            }),

        }),

        logout : build.query({
            query : () => ({
                url : "/logout",
            })
        }),
    }),

})




export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi;