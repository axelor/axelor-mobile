import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchInventory,
  modifyDescriptionInventory,
  searchInventoryFilter,
  updateInventoryStatus,
} from '@/modules/stock/api/inventory-api';
import {handlerApiCall} from '@/api/utils';

export const searchInventories = createAsyncThunk(
  'inventories/searchInventories',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchInventoryFilter},
      data,
      'filter inventories',
      {getState},
      {array: true},
    );
  },
);

export const modifyDescription = createAsyncThunk(
  'inventories/modifyDescription',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: modifyDescriptionInventory},
      data,
      'modify inventory description',
      {getState},
      {showToast: true, array: false},
    ).then(object =>
      handlerApiCall(
        {fetchFunction: fetchInventory},
        {inventoryId: object.id},
        'fetch Inventory by id',
        {getState},
        {array: false},
      ),
    );
  },
);

export const updateInventory = createAsyncThunk(
  'inventories/updateInventory',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: updateInventoryStatus},
      data,
      'update inventory status',
      {getState},
      {showToast: true},
    ).then(object =>
      handlerApiCall(
        {fetchFunction: fetchInventory},
        {inventoryId: object.inventoryId},
        'fetch Inventory by id',
        {getState},
        {array: false},
      ),
    );
  },
);

export const fetchInventoryById = createAsyncThunk(
  'inventories/fetchInventoryById',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: fetchInventory},
      data,
      'fetch Inventory by id',
      {getState},
      {array: false},
    );
  },
);

const initialState = {
  loading: false,
  inventory: null,
  moreLoading: false,
  isListEnd: false,
  inventoryList: [],
};

const inventorySlice = createSlice({
  name: 'inventories',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInventoryById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchInventoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
    builder.addCase(searchInventories.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchInventories.fulfilled, (state, action) => {
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
    builder.addCase(modifyDescription.pending, state => {
      state.loading = true;
    });
    builder.addCase(modifyDescription.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
    builder.addCase(updateInventory.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
  },
});

export const inventoryReducer = inventorySlice.reducer;
