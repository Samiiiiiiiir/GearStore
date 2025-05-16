import { doc, getDoc } from 'firebase/firestore';

import { db } from '@lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: unknown;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const getUserInfo = createAsyncThunk(
  'user/fetchById',
  async (uid: unknown, { rejectWithValue }) => {
    if (!uid) return null;

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); /* as UserType; */
      } else {
        return null;
      }
    } catch (error) {
      console.log('getUserInfo error', error);
      return rejectWithValue('Error getting user');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
