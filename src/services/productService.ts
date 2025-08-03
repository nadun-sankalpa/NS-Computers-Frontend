import { backendApi } from './api';
import type { Product } from '../types/product';
import { toast } from 'react-toastify';

const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await backendApi.get('/products/get-all-products');
      // The backend returns { success, count, data } where data contains the products array
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        console.error('Unexpected response format:', response.data);
        toast.error('Received unexpected data format from server');
        return [];
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please check your backend connection.');
      return [];
    }
  },

  // Get single product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await backendApi.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error('Failed to load product details');
      return null;
    }
  },

  // Create new product
  async createProduct(productData: ProductFormData): Promise<Product | null> {
    try {
      const response = await backendApi.post('/products', productData);
      toast.success('Product created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
      return null;
    }
  },

  // Update existing product
  async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
    try {
      const response = await backendApi.patch(`/products/${id}`, productData);
      toast.success('Product updated successfully');
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      toast.error('Failed to update product');
      return null;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    try {
      await backendApi.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      return true;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      toast.error('Failed to delete product');
      return false;
    }
  },

  // Upload product image
  async uploadProductImage(file: File): Promise<{ url: string } | null> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await backendApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { url: response.data.url };
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
  },
};

export default productService;
