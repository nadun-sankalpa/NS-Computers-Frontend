// src/slices/productsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductData } from "../model/ProductData.ts";
import { backendApi } from "../services/api"; // Corrected import path to point to services/api.ts

interface ProductState {
    list: ProductData[];
    error: string | null | undefined;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'; // Added loading state
}

const initialState: ProductState = {
    list: [],
    error: null,
    loading: 'idle'
}

export const getAllProducts = createAsyncThunk('products/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            // Corrected backend endpoint based on product.routes.ts and app.ts mounting
            const response = await backendApi.get("/products/get-all-products");
            return response.data;
        } catch (error: any) {
            // Use rejectWithValue to pass the error message to the rejected action
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch products");
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = 'pending';
                state.error = null; // Clear previous errors on new request
            })
            .addCase(getAllProducts.fulfilled, (state: ProductState, action: ReturnType<any>) => {
                state.loading = 'succeeded';
                state.list = action.payload;
            })
            .addCase(getAllProducts.rejected, (state: ProductState, action: ReturnType<any>) => {
                state.loading = 'failed';
                state.error = action.payload || "Unknown error occurred"; // Use action.payload for rejected value
                // IMPORTANT: DO NOT use alert() in React components. Use a proper UI message.
                // alert("Error loading: " + state.error); // Removed alert
            });
    }
});

export default productSlice.reducer;
