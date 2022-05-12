import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchInternalMove} from '@/modules/stock/api/internal-move-api';

export const fetchInternalMoves = createAsyncThunk(
  'internalMove/fetchInternalMove',
  async function () {
    return searchInternalMove().then(response => response.data.data);
  },
);

const initialState = {
  loadingInternalMove: true,
  internalMoveList: [],
};

const internalMoveSlice = createSlice({
  name: 'internalMove',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInternalMoves.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(fetchInternalMoves.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.internalMoveList = action.payload;
    });
  },
});

export const internalMoveReducer = internalMoveSlice.reducer;
