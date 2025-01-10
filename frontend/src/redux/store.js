

import {configureStore} from '@reduxjs/toolkit';
import { productApi } from './api/productApi.js';
import { authApi } from './api/authApi.js';
import { userApi } from './api/userApi.js';
import userSliceReducer  from './features/userSlice.js'



export const store = configureStore({
    reducer:  {
        auth : userSliceReducer,
        [productApi.reducerPath] : productApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        productApi.middleware, 
        authApi.middleware,
        userApi.middleware
    ]),
});


