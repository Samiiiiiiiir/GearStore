import { publicApiSlice } from '@api/publicApiSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@types';

interface InitialStateType {
  cart: CartItem[];
  regularPrice: number;
  discountedPrice: number;
}

const initialState: InitialStateType = {
  cart: [],
  regularPrice: 0,
  discountedPrice: 0,
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

      if (isAdded && isAdded.quantity > 1) {
        isAdded.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id != action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      publicApiSlice.endpoints.getCartProducts.matchFulfilled,
      (state, action) => {
        let regularPrice = 0;
        let discountedPrice = 0;

        action.payload.forEach((item) => {
          const availableItem = state.cart.find((i) => i.id === item._id);

          if (availableItem) {
            regularPrice += item.regularPrice * availableItem.quantity;
            discountedPrice += item.discountedPrice * availableItem.quantity;
          }
        });

        state.regularPrice = regularPrice;
        state.discountedPrice = discountedPrice;
      },
    );
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
