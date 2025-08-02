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
            console.log('Making API call to fetch products...');
            const response = await backendApi.get("/products/get-all-products");
            console.log('API response:', response);
            
            // Handle the API response format
            if (!response.data) {
                console.warn('No data received in the response');
                return [];
            }
            
            // The API returns data in a { success, count, data } format
            if (response.data.success && Array.isArray(response.data.data)) {
                console.log(`Received ${response.data.count} products`);
                return response.data.data;
            }
            
            console.warn('Unexpected API response format:', response.data);
            return [];
        } catch (error: any) {
            console.error('Error in getAllProducts:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to fetch products",
                status: error.response?.status,
                data: error.response?.data
            });
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
