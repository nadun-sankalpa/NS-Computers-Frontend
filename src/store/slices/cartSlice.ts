import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: string | number;
  quantity: number;
  // Add other cart item properties as needed
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add your cart-related reducers here
    // Example:
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //   const existingItem = state.items.find(item => item.id === action.payload.id);
    //   if (existingItem) {
    //     existingItem.quantity += action.payload.quantity;
    //   } else {
    //     state.items.push(action.payload);
    //   }
    //   state.total += action.payload.price * action.payload.quantity;
    // },
  },
});

export default cartSlice.reducer;
// Export actions if you add any
// export const { addToCart } = cartSlice.actions;
