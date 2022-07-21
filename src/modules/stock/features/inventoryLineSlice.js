import {useHandleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createInventoryLine,
  searchInventoryLines,
  updateInventoryLineDetails,
} from '../api/inventory-line-api';

export const fetchInventoryLines = createAsyncThunk(
  'inventoryLines/fetchInventoryLines',
  async function (data) {
    return searchInventoryLines(data)
      .catch(function (error) {
        useHandleError(error, 'fetch inventory lines');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const updateInventoryLine = createAsyncThunk(
  'inventoryLines/updateInventoryLine',
  async function (data) {
    return updateInventoryLineDetails(data)
      .catch(function (error) {
        useHandleError(error, 'update inventory line details');
      })
      .then(response => response.data.object);
  },
);

export const createNewInventoryLine = createAsyncThunk(
  'inventoryLines/createNewInventoryLine',
  async function (data) {
    return createInventoryLine(data)
      .catch(function (error) {
        useHandleError(error, 'create inventory line');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingInventoryLines: false,
  moreLoading: false,
  isListEnd: false,
  inventoryLineList: [],
  updateResponse: null,
  createResponse: null,
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
    builder.addCase(updateInventoryLine.pending, state => {
      state.loadingInventoryLines = true;
    });
    builder.addCase(updateInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.updateResponse = action.payload;
    });
    builder.addCase(createNewInventoryLine.pending, state => {
      state.loadingInventoryLines = true;
    });
    builder.addCase(createNewInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.createResponse = action.payload;
    });
  },
});

export const inventoryLineReducer = inventoryLineSlice.reducer;
