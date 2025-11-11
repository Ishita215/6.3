import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart slice holds items in this shape:
 * cart.items = [
 *   { id, name, price, quantity }
 * ]
 */

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart (if exists, increase quantity)
    addItem: (state, action) => {
      const { id, name, price } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, name, price, quantity: 1 });
      }
    },

    // Remove item completely from cart
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((it) => it.id !== id);
    },

    // Update quantity to a specific value (if <=0 remove)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (!existing) return;
      const q = parseInt(quantity, 10);
      if (isNaN(q) || q <= 0) {
        state.items = state.items.filter((it) => it.id !== id);
      } else {
        existing.quantity = q;
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
