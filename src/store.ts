import { configureStore } from '@reduxjs/toolkit';

// This is a basic store setup. You should replace the empty reducer with your actual reducers.
// For example: import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // For example: counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
