import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchInternalMove,
  searchInternalMoveFilter,
  createInternalStockMove,
  updateInternalStockMove,
} from '@/modules/stock/api/internal-move-api';
import {handleError} from '@/api/utils';

export const fetchInternalMoves = createAsyncThunk(
  'internalMove/fetchInternalMove',
  async function (data) {
    return searchInternalMove(data)
      .catch(function (error) {
        handleError(error, 'fetch internal moves');
      })
      .then(response => response.data.data);
  },
);

export const searchInternalMoves = createAsyncThunk(
  'internalMove/searchInternalMoves',
  async function (data) {
    return searchInternalMoveFilter(data)
      .catch(function (error) {
        handleError(error, 'filter internal moves');
      })
      .then(response => response.data.data);
  },
);

export const createInternalMove = createAsyncThunk(
  'internalMove/createInternalMove',
  async function (data) {
    return createInternalStockMove(data)
      .catch(function (error) {
        handleError(error, 'create internal move');
      })
      .then(response => response.data.object);
  },
);

export const updateInternalMove = createAsyncThunk(
  'internalMove/updateInternalMove',
  async function (data) {
    return updateInternalStockMove(data)
      .catch(function (error) {
        handleError(error, 'update internal move');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingInternalMove: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveList: [],
  createResponse: {},
  updateResponse: {},
};

const internalMoveSlice = createSlice({
  name: 'internalMove',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInternalMoves.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingInternalMove = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInternalMoves.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.internalMoveList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.internalMoveList = [
            ...state.internalMoveList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(searchInternalMoves.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(searchInternalMoves.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.isListEnd = false;
      state.internalMoveList = action.payload;
    });
    builder.addCase(createInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(createInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.createResponse = action.payload;
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
