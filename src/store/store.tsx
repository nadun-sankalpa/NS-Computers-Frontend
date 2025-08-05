import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import productReducer from "@/slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "@/slices/userSlice";
import orderReducer from "@/slices/orderSlice";

// Create the store with explicit type annotations
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    users: userReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
