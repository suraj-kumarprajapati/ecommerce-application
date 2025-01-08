

import {configureStore} from '@reduxjs/toolkit';
import { productApi } from './api/productApi.js';
import { authApi } from './api/authApi.js';



export const store = configureStore({
    reducer:  {
        [productApi.reducerPath] : productApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, authApi.middleware]),
});


