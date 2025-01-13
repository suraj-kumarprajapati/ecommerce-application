



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setIsUserLoading, setUser } from "../features/userSlice";






export const userApi = createApi({

    reducerPath : "userApi",

    baseQuery : fetchBaseQuery({
        baseUrl : '/api/v1',
    }),

    tagTypes : ["User"],

    endpoints : (build) => ({
        getMyProfile : build.query({
            query : () => ({
                url : '/me',
            }),

            // transform the response after getting response
            transformResponse : (response) => response.user,

            // set the auth reducer after getting response 
            async onQueryStarted(args, {dispatch, queryFulfilled})  {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setIsUserLoading(false));
                }
                catch(error) {
                    dispatch(setIsUserLoading(false));
                    console.log(error);
                }
            },

            providesTags : ["User"]
        }),

        updateUser : build.mutation({
            query : (body) => ({
                url : '/me/update',
                method : 'PUT',
                body : body,
            }),

            invalidatesTags : ["User"]
        }),

        uploadAvatar : build.mutation({
            query : (body) => ({
                url : '/me/upload_avatar',
                method : 'PUT',
                body : body,
            }),

            invalidatesTags : ["User"]
        })
        
    }),

})




export const { useGetMyProfileQuery, useUpdateUserMutation, useUploadAvatarMutation } = userApi;