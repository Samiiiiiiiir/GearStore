import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { publicApiSlice } from './../api/publicApiSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import wishlistSlice from './slices/wishlistSlice';

const rootReducer = combineReducers({
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  wishlistSlice,
  userSlice,
  cartSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userSlice', 'cartSlice', 'wishlistSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(publicApiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
