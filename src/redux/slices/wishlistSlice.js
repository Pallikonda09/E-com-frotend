// src/redux/slices/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const existing = state.items.find(item => item._id === action.payload._id);
      if (existing) {
        state.items = state.items.filter(item => item._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
