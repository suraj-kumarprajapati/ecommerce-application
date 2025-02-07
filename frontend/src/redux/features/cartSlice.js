



import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :  [],
}

export const cartSlice = createSlice({
    initialState,
    name : "cartSlice",
    reducers : {
        setCartItem : (state, action) => { 
            // new cart item
            const item = action.payload;
 
            // console.log(item);
            // check if the curr item already exists in the cart
            const doesItemExist = state.cartItems.find(
                (it) => it.product === item.product
            );

            // if item exists, update the cart item
            if(doesItemExist) {
                state.cartItems = state.cartItems.map((it) =>
                    it.product === item.product ? item : it
                ); 
            }
            // otherwise, add this item   
            else {
                state.cartItems.push(item);
            }

            localStorage.setItem("cartItems", JSON.stringify(state?.cartItems));
        },

        removeCartItem : (state, action) => { 
            // first delete items from the local storage
            localStorage.removeItem("cartItems");
            
            // filter the cart items
            state.cartItems = state.cartItems.filter(
                (it) => it.product !== action.payload
            );
            
            // update the local storage
            localStorage.setItem("cartItems", JSON.stringify(state?.cartItems));
        },

        clearCartItem : (state, action) => {
            state.cartItems = [];
        }
    }
})


// Action creators are generated for each case reducer function
export const { setCartItem, removeCartItem, clearCartItem } = cartSlice.actions;

export default cartSlice.reducer;