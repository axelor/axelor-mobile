import {handleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchInventoryLines} from '../api/inventory-line-api';

export const fetchInventoryLines = createAsyncThunk(
  'inventoryLines/fetchInventoryLines',
  async function (data) {
    return searchInventoryLines(data)
      .catch(function (error) {
        handleError(error, 'fetch inventory lines');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

const initialState = {
  loadingInventoryLines: false,
  moreLoading: false,
  isListEnd: false,
  inventoryLineList: [],
};

const inventoryLineSlice = createSlice({
  name: 'inventoryLines',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInventoryLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingInventoryLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInventoryLines.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.inventoryLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.inventoryLineList = [
            ...state.inventoryLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const inventoryLineReducer = inventoryLineSlice.reducer;
