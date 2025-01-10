

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null,
    isAuthenticated : false,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    
    setUser : (state, action) => {
        state.user = action.payload;
    },

    setIsAuthenticated : (state, action) => {
        state.isAuthenticated = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setUser, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;