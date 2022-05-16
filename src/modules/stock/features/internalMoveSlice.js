import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchInternalMove,
  createInternalStockMove,
  updateInternalStockMove,
} from '@/modules/stock/api/internal-move-api';

export const fetchInternalMoves = createAsyncThunk(
  'internalMove/fetchInternalMove',
  async function () {
    return searchInternalMove().then(response => response.data.data);
  },
);

export const createInternalMove = createAsyncThunk(
  'internalMove/createInternalMove',
  async function (data) {
    return createInternalStockMove(data)
      .catch(function (error) {
        if (error.response) {
          console.log('Error got caugth: ');
          console.log(error.response.data);
        }
      })
      .then(response => response.data.object);
  },
);

export const updateInternalMove = createAsyncThunk(
  'internalMove/updateInternalMove',
  async function (data) {
    return updateInternalStockMove(data)
      .catch(function (error) {
        if (error.response) {
          console.log('Error got caugth: ');
          console.log(error.response.data);
        }
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingInternalMove: true,
  internalMoveList: [],
  createResponse: {},
  updateResponse: {},
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
    builder.addCase(createInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(createInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.createResponse = action.payload;
    });
    builder.addCase(createInternalMove.rejected, (state, action) => {
      state.loadingInternalMove = false;
      state.error = action;
    });
    builder.addCase(updateInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(updateInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.updateResponse = action.payload;
    });
  },
});

export const internalMoveReducer = internalMoveSlice.reducer;
