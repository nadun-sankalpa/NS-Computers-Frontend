import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import userReducer from '../slices/userSlice';

// Create the store
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

// Get the types
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Export the store with types
export default store;
export type { RootState, AppDispatch };
