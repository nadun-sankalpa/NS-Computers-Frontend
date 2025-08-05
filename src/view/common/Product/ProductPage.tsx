// src/view/common/Product/ProductPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { getAllProducts } from "@/slices/productSlice";
import { ProductCard } from './ProductCard';
import { useAppSelector } from "@/app/hooks";
import ParticleBackground from '../../pages/home/particle-background';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { addToCart } from '@/features/cart/cartSlice';
import type { Product } from '@/types/product';
import type { RootState } from '@/store';
import { ShoppingCart } from 'lucide-react';

// Memoized selector to prevent unnecessary re-renders
const selectProductsState = (state: RootState) => state.product;

const selectProductsData = createSelector(
  [selectProductsState],
  (productState) => ({
    products: productState.list || [],
    status: productState.loading,
    error: productState.error
  })
);

export interface ProductsPageProps {
  onAddToCart?: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = () => {
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Using the memoized selector
  const { products, status, error } = useAppSelector(selectProductsData);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllProducts());
    }
  }, [dispatch, status]);

  const handleAddToCart = (product: Product) => {
    // Add product to cart
    const cartItem = {
      id: product._id || product.id,
      name: product.name || product.title || 'Unnamed Product',
      price: typeof product.price === 'number' ? product.price : Number(product.price) || 0,
      image: (product.images && product.images[0]) || product.image || '/images/network.jpg',
      quantity: 1,
    };
    
    dispatch(addToCart(cartItem));
    setIsCartOpen(true);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-blue-900/20 z-0"></div>
      
      {/* Cart Toggle Button */}
      <button 
        onClick={toggleCart}
        className="fixed right-4 top-24 z-40 p-3 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        aria-label="View cart"
      >
        <ShoppingCart className="h-6 w-6" />
      </button>
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-5xl lg:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent animate-pulse">
          Our Products
        </h1>

        {status === 'loading' && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            <span className="ml-4 text-xl">Loading products...</span>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center p-4 bg-red-900/50 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Products</h2>
            <p className="text-red-300">
              {typeof error === 'string' 
                ? error 
                : 'Failed to load products. Please try again later.'}
            </p>
            <button 
              onClick={() => dispatch(getAllProducts())}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Retry
            </button>
            <div className="mt-2 text-sm text-red-400">
              API Endpoint: http://localhost:3000/api/products
            </div>
          </div>
        )}

        {status === 'succeeded' && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No products available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back later or contact support.</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product: Product) => (
              <ProductCard 
                key={product._id} 
                data={product} 
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
