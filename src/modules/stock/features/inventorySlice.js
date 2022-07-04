import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  modifyDescriptionInventory,
  searchInventory,
  searchInventoryFilter,
} from '@/modules/stock/api/inventory-api';
import {handleError} from '@/api/utils';

export const fetchInventories = createAsyncThunk(
  'inventories/fetchInventories',
  async function (data) {
    return searchInventory(data)
      .catch(function (error) {
        handleError(error, 'fetch inventories');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const searchInventories = createAsyncThunk(
  'inventories/searchInventories',
  async function (data) {
    return searchInventoryFilter(data)
      .catch(function (error) {
        handleError(error, 'filter inventories');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const modifyDescription = createAsyncThunk(
  'inventories/modifyDescription',
  async function (data) {
    return modifyDescriptionInventory(data)
      .catch(function (error) {
        handleError(error, 'modify inventory description');
      })
      .then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  inventoryList: [],
};

const inventorySlice = createSlice({
  name: 'inventories',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInventories.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInventories.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.inventoryList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.inventoryList = [...state.inventoryList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(searchInventories.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchInventories.fulfilled, (state, action) => {
      state.loading = false;
      state.isListEnd = false;
      state.inventoryList = action.payload;
    });
    builder.addCase(modifyDescription.pending, state => {
      state.loading = true;
    });
    builder.addCase(modifyDescription.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const inventoryReducer = inventorySlice.reducer;
