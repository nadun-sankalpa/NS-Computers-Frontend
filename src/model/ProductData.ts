export interface ProductData {
    _id: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    images: string[]; // Array of image URLs
    image?: string; // For backward compatibility
    category?: string;
    isNew?: boolean;
    isOnSale?: boolean;
    stock: number;
    description: string;
    brand?: string;
    specifications?: Record<string, string>;
    createdAt?: string;
    updatedAt?: string;
}
