import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductData } from '../model/ProductData';

// Ensure ProductData has the correct shape
type CartProductData = ProductData & {
  id: string;
  _id?: string;
  price: number | string;
};

interface CartItem extends ProductData {
  quantity: number;
  id: string; // Ensure id is always a string
}

interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Helper to ensure price is a number
const ensureNumber = (price: number | string): number => {
  if (typeof price === 'number') return price;
  const num = parseFloat(price);
  return isNaN(num) ? 0 : num;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ProductData>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      // Ensure the item has an image, otherwise use a default one
      const itemImage = newItem.image || '/images/default-product.jpg';
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          id: newItem.id || String(newItem._id || ''),
          quantity: 1,
          price: ensureNumber(newItem.price),
          image: itemImage,
          name: newItem.name || 'Unnamed Product',
          description: newItem.description || ''
        });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += ensureNumber(newItem.price);
    },
    updateQuantity: (state, action: PayloadAction<{id: string; quantity: number}>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id || item._id === id);
      
      if (existingItem) {
        const price = ensureNumber(existingItem.price);
        const oldQuantity = existingItem.quantity;
        const quantityDiff = quantity - oldQuantity;
        
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += price * quantityDiff;
        
        // Ensure totals don't go negative
        state.totalQuantity = Math.max(0, state.totalQuantity);
        state.totalAmount = Math.max(0, state.totalAmount);
        
        // Remove item if quantity is zero or negative
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id && item._id !== id);
        }
        
        // Persist to localStorage
        localStorage.setItem('cart', JSON.stringify({
          items: state.items,
          totalQuantity: state.totalQuantity,
          totalAmount: state.totalAmount
        }));
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
        
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;