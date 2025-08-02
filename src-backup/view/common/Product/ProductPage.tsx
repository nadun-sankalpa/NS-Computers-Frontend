// src/view/common/Product/ProductPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllProducts } from '../../../slices/productSlice';
import { ProductCard } from './ProductCard';
import { type AppDispatch, type RootState } from '../../../store/store';
import ParticleBackground from '../../pages/home/particle-background';

export interface ProductsPageProps {
    onAddToCart?: () => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { list: products, loading, error } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Starting to fetch products...');
                const result = await dispatch(getAllProducts()).unwrap();
                console.log('Fetched products:', result);
                
                if (!result || result.length === 0) {
                    console.warn('No products found in the database');
                    toast.warning('No products found. The database might be empty or there might be a connection issue.');
                    
                    // Check if we can access the API directly
                    try {
                        const apiResponse = await fetch('http://localhost:3000/api/products/get-all-products');
                        const apiData = await apiResponse.json();
                        console.log('Direct API response:', apiData);
                        
                        if (apiData && apiData.length === 0) {
                            toast.warning('The database is empty. Please add products through the admin panel.');
                        }
                    } catch (apiError) {
                        console.error('Error checking API directly:', apiError);
                        toast.error('Could not connect to the products API. Please check if the backend is running.');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
                toast.error('Failed to load products. Please try again later.');
                
                // More detailed error handling
                if (error instanceof Error) {
                    if (error.message.includes('Network Error')) {
                        toast.error('Network error: Could not connect to the server. Make sure the backend is running.');
                    } else if (error.message.includes('401')) {
                        toast.error('Authentication error: Please log in again.');
                    } else if (error.message.includes('404')) {
                        toast.error('Products endpoint not found. The API might have changed.');
                    } else if (error.message.includes('500')) {
                        toast.error('Server error: Please try again later or contact support.');
                    }
                }
            }
        };
        
        fetchProducts();
    }, [dispatch]);

    // Debug effect to log state changes
    React.useEffect(() => {
        console.log('Products state updated:', {
            loading,
            error,
            productCount: products?.length || 0,
            products
        });
    }, [products, loading, error]);

    return (
        <div className="min-h-screen bg-black text-white pt-32 relative overflow-hidden">
            <ParticleBackground />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-blue-900/20 z-0"></div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent animate-pulse">
                    Our Products
                </h1>

                {loading === 'pending' && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                        <span className="ml-4 text-xl">Loading products...</span>
                    </div>
                )}

                {loading === 'failed' && (
                    <div className="text-center p-4 bg-red-900/50 rounded-lg max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Products</h2>
                        <p className="text-red-300">{error || 'Failed to load products. Please try again later.'}</p>
                        <button 
                            onClick={() => dispatch(getAllProducts())}
                            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {loading === 'succeeded' && products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-400">No products available at the moment.</p>
                        <p className="text-gray-500 mt-2">Check back later or contact support.</p>
                    </div>
                )}

                {loading === 'succeeded' && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                data={product} 
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
