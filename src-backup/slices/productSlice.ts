// src/slices/productsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductData } from "../model/ProductData.ts";
import { backendApi } from "../services/api";
import { toast } from "react-toastify";

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

interface ApiError {
    message: string;
    status?: number;
}

// Helper function to transform backend product to frontend ProductData
const transformProduct = (backendProduct: any): ProductData => ({
    _id: backendProduct._id?.toString(),
    title: backendProduct.name || 'No Name',
    price: backendProduct.price || 0,
    description: backendProduct.description || '',
    stock: backendProduct.stock || 0,
    category: backendProduct.category || 'Uncategorized',
    images: backendProduct.imageUrl ? [backendProduct.imageUrl] : [],
    image: backendProduct.imageUrl || '',
    brand: 'NS Computers',
    isNew: true, // You might want to set this based on createdAt date
    rating: 4.5, // Default rating
    reviewCount: 10 // Default review count
});

export const getAllProducts = createAsyncThunk<ProductData[], void, { rejectValue: string }>(
    'products/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching products from:', '/products/get-all-products');
            const response = await backendApi.get("/products/get-all-products");
            console.log('Raw API response:', JSON.stringify(response, null, 2));
            
            if (!response.data) {
                console.warn('Received empty data from products API');
                toast.warn('No data received from the server');
                return [];
            }

            // Check the structure of the response data
            console.log('Response data structure:', {
                isArray: Array.isArray(response.data),
                dataType: typeof response.data,
                keys: Object.keys(response.data),
                dataSample: JSON.stringify(response.data, null, 2).substring(0, 500) + '...'
            });

            // Handle different response structures
            let productsData = response.data;
            
            // If data is nested in a 'data' property
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                productsData = response.data.data;
                console.log('Found products in response.data.data:', productsData.length);
            }
            // If data is directly an array
            else if (Array.isArray(response.data)) {
                productsData = response.data;
                console.log('Found products directly in response.data:', productsData.length);
            }
            // If data is an object with products array
            else if (response.data.products && Array.isArray(response.data.products)) {
                productsData = response.data.products;
                console.log('Found products in response.data.products:', productsData.length);
            }
            
            console.log('Products data to transform:', JSON.stringify(productsData, null, 2));
            
            // Transform the backend data to match the frontend ProductData interface
            const products = Array.isArray(productsData) 
                ? productsData.map(transformProduct)
                : [];
                
            console.log('Transformed products:', products);
            return products;
            
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch products";
            console.error('API Error Details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
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
