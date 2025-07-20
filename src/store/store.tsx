import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/slices/userSlice'; // ✅ points to the correct reducer location

export const store = configureStore({
    reducer: {
        user: userReducer, // ✅ this must be a valid reducer function
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
