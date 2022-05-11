import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchUser} from '@/modules/auth/api/user-api';

export const fetchUser = createAsyncThunk('user/fetchUser', async function () {
  return searchUser().then(response => response.data.data);
});

const initialState = {
  loadingUser: true,
  userList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loadingUser = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.userList = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
