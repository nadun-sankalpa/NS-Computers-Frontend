// src/view/common/Product/ProductCard.tsx
"use client"

import { useState } from "react"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ProductData } from "@/model/ProductData"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { addToCart, selectCartItems } from "@/features/cart/cartSlice"

type ProductCardProps = {
    data: ProductData;
    onAddToCart?: () => void;
}

export function ProductCard({ data, onAddToCart }: ProductCardProps) {
    // Debug log to check the incoming data
    console.log('ProductCard data:', data);

    const [isHovered, setIsHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartItem = cartItems.find(item => item.id === (data.id || data._id));

    const handleAddToCart = () => {
        if (data.stock <= 0) return; // Prevent adding out of stock items

        setIsAddingToCart(true);
        
        try {
            // Get the product image - use the first image from images array, then fall back to image, then use default
            const productImage = (data.images && data.images.length > 0) 
                ? data.images[0] 
                : data.image || '/images/network.jpg';
            
            // Create a cart item with the correct structure expected by the cart slice
            const cartItem = {
                id: data.id || data._id, // Ensure we have an id
                name: data.name || data.title || 'Unnamed Product',
                price: typeof data.price === 'number' ? data.price : Number(data.price) || 0,
                image: productImage,
                stock: data.stock || 1,
            };
            
            console.log('Adding to cart:', cartItem);
            
            // Only dispatch addToCart if onAddToCart is not provided
            // If onAddToCart is provided, it will handle the dispatch
            if (onAddToCart) {
                onAddToCart();
            } else {
                dispatch(addToCart(cartItem));
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsAddingToCart(false);
        }
    }

    const renderStars = () => {
        const isSpecialModel = data.title?.toLowerCase().includes('tuf f15') || 
                             data.title?.toLowerCase().includes('rog strix');
        
        return Array.from({ length: 5 }, (_, i) => {
            // For special models (TUF F15 or ROG Strix), show 4.5 stars
            if (isSpecialModel && i === 4) {
                return (
                    <div key={i} className="relative w-4 h-4">
                        {/* White half */}
                        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
                            <Star className="w-4 h-4 fill-white text-white" />
                        </div>
                        {/* Red half */}
                        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
                            <Star className="w-4 h-4 fill-red-500 text-red-500 -ml-2" />
                        </div>
                    </div>
                );
            }
            
            // For all other cases, show full stars
            return (
                <Star
                    key={i}
                    className={`w-4 h-4 ${
                        i < 4 
                            ? "fill-red-500 text-red-500" // First 4 stars in red
                            : "fill-white text-white"     // Last star in white
                    }`}
                />
            );
        });
    }

    // Log the product data for debugging
    console.log('Product Data:', data);
    
    // Extract the first line of the description as it likely contains the model name
    const getFirstLine = (text: string) => (text || '').split('\n')[0].trim();
    
    // Map product names to their corresponding local images
    const getProductImage = () => {
        // Try to get the model from the first line of the description
        const descriptionFirstLine = getFirstLine(data.description || '').toLowerCase();
        const productTitle = (data.title || '').toLowerCase().trim();
        
        console.log('Product Title:', productTitle);
        console.log('Description First Line:', descriptionFirstLine);
        
        // Direct mapping of model names to image paths
        const imageMap: {[key: string]: string} = {
            // ASUS Models
            'tuf f15': '/images/asus tuf2.webp',
            'tuf f15 fx506': '/images/asus tuf2.webp',
            'rog strix': '/images/Asus rog.jpg',
            'rog strix g15': '/images/Asus rog.jpg',
            'rog strix g17': '/images/Asus rog.jpg',
            'asus rog': '/images/Asus rog.jpg',
            'asus tuf': '/images/asus tuf2.webp',
            
            // MSI Models
            'msi katana': '/images/msi.jpg',
            'msi gf63': '/images/msi.jpg',
            'msi thin': '/images/msi.jpg',
            'msi raider': '/images/msi.jpg',
            
            // MacBooks
            'macbook air': '/images/macbooks.png',
            'macbook pro': '/images/macbooks.png',
            'macbook': '/images/macbooks.png',
            'm1': '/images/macbooks.png',
            'm2': '/images/macbooks.png',
            
            // Gaming PCs
            'gaming': '/images/gaming pc.jpg',
            'gaming laptop': '/images/gaming pc.jpg',
            'gaming pc': '/images/gaming pc.jpg',
        };
        
        // First, try to match with the first line of description
        for (const [key, value] of Object.entries(imageMap)) {
            if (descriptionFirstLine.includes(key)) {
                console.log(`Matched via description "${key}":`, value);
                return value;
            }
        }
        
        // If no match in description, try with the product title
        for (const [key, value] of Object.entries(imageMap)) {
            if (productTitle.includes(key)) {
                console.log(`Matched via title "${key}":`, value);
                return value;
            }
        }
        
        // If still no match, check for common keywords in both title and description
        const searchText = `${productTitle} ${descriptionFirstLine}`.toLowerCase();
        
        if (searchText.includes('tuf') || searchText.includes('f15') || searchText.includes('fx506')) {
            console.log('Matched via keyword (TUF/F15)');
            return '/images/asus tuf no bg.png';
        }
        
        if (searchText.includes('rog') || searchText.includes('strix') || searchText.includes('g15') || searchText.includes('g17')) {
            console.log('Matched via keyword (ROG/Strix)');
            return '/images/Asus rog.jpg';
        }
        
        if (searchText.includes('msi')) {
            console.log('Matched via keyword (MSI)');
            return '/images/msi.jpg';
        }
        
        if (searchText.includes('macbook') || searchText.includes('m1') || searchText.includes('m2')) {
            console.log('Matched via keyword (MacBook)');
            return '/images/macbooks.png';
        }
        
        console.log('No specific match found, using default image');
        return '/images/network.jpg';
    };
    
    const imageUrl = getProductImage();
    const isOutOfStock = data.stock <= 0;
    const alreadyInCart = Boolean(cartItem);


    return (
        <Card
            className="h-full flex flex-col overflow-hidden bg-amber-50 hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-red-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image Container */}
            <div className="relative aspect-square bg-white overflow-hidden">
                {/* Image container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={data.title || 'Product Image'}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                            isHovered ? 'scale-110' : 'scale-100'
                        }`}
                        onLoad={() => console.log(`Successfully loaded image: ${imageUrl}`)}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.error(`Failed to load image: ${imageUrl}`);
                            if (target.src !== '/images/network.jpg') {
                                console.log('Falling back to network.jpg');
                                target.src = '/images/network.jpg';
                            } else {
                                console.error('Fallback image also failed to load');
                            }
                        }}
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[10px] p-0.5 text-center truncate">
                        {imageUrl.split('/').pop()}
                    </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {data.isNew && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-sm">
                            New Arrival
                        </Badge>
                    )}
                    {data.isOnSale && (
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-sm">
                            {Math.round(((data.originalPrice! - data.price) / data.originalPrice!) * 100)}% OFF
                        </Badge>
                    )}
                    {data.stock <= 0 && (
                        <Badge className="bg-gradient-to-r from-gray-600 to-gray-700 text-white border-0 shadow-sm">
                            Out of Stock
                        </Badge>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
                        isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsLiked(!isLiked)
                    }}
                    aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Add to Cart Button (shown on hover) */}
                {!isOutOfStock && (
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-2 transform transition-all duration-300 ${
                            isHovered ? 'translate-y-0' : 'translate-y-full'
                        }`}
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-white hover:bg-white/10 font-medium tracking-wide"
                            onClick={handleAddToCart}
                            disabled={isAddingToCart || alreadyInCart}
                        >
                            {isAddingToCart
                                ? 'Adding...'
                                : alreadyInCart
                                    ? '✓ In Cart'
                                    : '🛒 Add to Cart'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <CardContent className="p-5 flex-grow flex flex-col">
                {/* Category */}
                {data.category && (
                    <p className="text-xs text-gray-500 mb-1 capitalize">{data.category}</p>
                )}

                {/* Laptop Name - Direct access to all data properties */}
                <div className="mb-2">
                    <h2 
                        className="font-extrabold text-white text-2xl line-clamp-2 leading-tight"
                        style={{
                            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                            WebkitTextStroke: '0.5px #000',
                        }}
                        title={data.name || data.title || 'Product Name'}
                    >
                        {data.name || data.title || data.productName || 'Laptop'}
                    </h2>
                </div>

                {/* Brand (if available) */}
                {data.brand && (
                    <p className="text-sm text-gray-600 mb-2">{data.brand}</p>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                        {renderStars()}
                    </div>
                    {data.reviewCount !== undefined && data.reviewCount > 0 && (
                        <span className="text-xs text-gray-500 ml-1">({data.reviewCount})</span>
                    )}
                </div>

                {/* Description */}
                {data.description && (
                    <div className="mb-3">
                        <p className="text-sm text-white line-clamp-2" title={data.description}>
                            {data.description}
                        </p>
                    </div>
                )}

                {/* Price */}
                <div className="mt-auto">
                    <div className="flex items-baseline space-x-2">
                        <span className="font-bold text-lg text-yellow-400">
                            LKR {data.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                        {data.originalPrice && data.originalPrice > data.price && (
                            <span className="text-sm text-gray-400 line-through">
                                LKR {data.originalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isOutOfStock 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-600 text-white'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            isOutOfStock ? 'bg-red-500' : 'bg-white'
                        }`}></span>
                        {isOutOfStock ? 'Out of Stock' : `In Stock (${data.stock})`}
                    </div>
                </div>

                {/* Add to Cart Button (for mobile) */}
                {!isOutOfStock && (
                    <Button
                        variant="default"
                        size="sm"
                        className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        onClick={handleAddToCart}
                        disabled={isAddingToCart || alreadyInCart}
                    >
                        {isAddingToCart
                            ? '🔄 Adding...'
                            : alreadyInCart
                                ? '✓ In Cart'
                                : '🛒 Add to Cart'}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
