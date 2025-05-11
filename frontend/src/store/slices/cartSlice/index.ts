import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../../types';

interface InitialStateType {
  cart: CartItem[];
}

const initialState: InitialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const isAdded = state.cart.find((item) => item.id == action.payload);

      if (!isAdded) {
        state.cart.push({ id: action.payload, quantity: 1 });
      } else {
        isAdded.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const isAdded = state.cart.find((item) => item.id == action.payload);

      if (isAdded) {
        if (isAdded.quantity > 1) {
          isAdded.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id != isAdded.id);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id != action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
