import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    updateQuantity: (state, action: PayloadAction<{id: string; quantity: number}>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += quantityDiff * existingItem.price;
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      } else if (existingItem && quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.quantity * existingItem.price;
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        } else {
          existingItem.quantity -= 1;
        }
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    loadCart: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const { items, totalQuantity, totalAmount } = JSON.parse(savedCart);
        state.items = items;
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
      }
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, removeItem, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;
// Alias for selectTotalAmount for consistency in naming
export const selectTotalPrice = selectTotalAmount;
