// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice'; // Import your product slice
import cartReducer from './slices/cartSlice'; // Assuming you have a cartSlice

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer, // Include your cart reducer
    // ... add other reducers here as your app grows
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
