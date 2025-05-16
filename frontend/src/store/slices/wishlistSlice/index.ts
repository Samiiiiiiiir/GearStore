import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '@types';

interface InitialStateType {
  list: ProductItem[];
}

const initialState: InitialStateType = {
  list: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action: PayloadAction<ProductItem>) => {
      const isAded = state.list.find((i) => action.payload._id == i._id);

      if (isAded) {
        state.list = state.list.filter((item) => item._id !== isAded._id);
      } else {
        state.list.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.list = [];
    },
  },
});

export const { toggleWishlistItem, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
