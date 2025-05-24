import { doc, getDoc } from 'firebase/firestore';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '@types';
import { db } from '@utils';

interface UserState {
  user: undefined | IUserData;
  isLoading: boolean;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
};

export const getUserInfo = createAsyncThunk<
  IUserData | undefined,
  string,
  { rejectValue: string }
>('user/fetchById', async (uid, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as IUserData;
    }
    return rejectWithValue('User not found');
  } catch (error) {
    console.error('getUserInfo error', error);
    return rejectWithValue('Error getting user');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<IUserData | undefined>) => {
          state.user = action.payload;
          state.isLoading = false;
        },
      );
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
