import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchInternalMoveLines} from '@/modules/stock/api/internal-move-line-api';

export const fetchInternalMoveLines = createAsyncThunk(
  'internalMoveLine/fetchInternalMoveLine',
  async function (internalMoveId) {
    return searchInternalMoveLines(internalMoveId).then(
      response => response.data.data,
    );
  },
);

const initialState = {
  loadingInternalMoveLine: false,
  internalMoveLineList: [],
};

const internalMoveLineSlice = createSlice({
  name: 'internalMoveLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInternalMoveLines.pending, state => {
      state.loadingInternalMoveLine = true;
    });
    builder.addCase(fetchInternalMoveLines.fulfilled, (state, action) => {
      state.loadingInternalMoveLine = false;
      state.internalMoveLineList = action.payload;
    });
  },
});

export const internalMoveLineReducer = internalMoveLineSlice.reducer;
