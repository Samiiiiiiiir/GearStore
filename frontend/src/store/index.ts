import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { publicApiSlice } from '@api/publicApiSlice';
import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import wishlistSlice from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    [publicApiSlice.reducerPath]: publicApiSlice.reducer,
    cartSlice,
    wishlistSlice,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicApiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
