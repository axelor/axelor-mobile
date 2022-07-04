import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleError} from '@/api/utils';
import {
  searchClient,
  searchClientsFilter,
  searchSuppliers,
  searchSuppliersFilter,
} from '@/modules/stock/api/partner-api';

export const fetchClients = createAsyncThunk(
  'partners/fetchClients',
  async function () {
    return searchClient()
      .catch(function (error) {
        handleError(error, 'fetch clients');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const filterClients = createAsyncThunk(
  'partners/filterClients',
  async function (data) {
    return searchClientsFilter(data)
      .catch(function (error) {
        handleError(error, 'filter clients');
      })
      .then(response => response.data.data);
  },
);

export const fetchSuppliers = createAsyncThunk(
  'partners/fetchSuppliers',
  async function () {
    return searchSuppliers()
      .catch(function (error) {
        handleError(error, 'fetch suppliers');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const filterSuppliers = createAsyncThunk(
  'partners/filterSuppliers',
  async function (data) {
    return searchSuppliersFilter(data)
      .catch(function (error) {
        handleError(error, 'filter suppliers');
      })
      .then(response => response.data.data);
  },
);

const initialState = {
  loadingPartners: false,
  clientList: [],
  supplierList: [],
};

const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchClients.pending, state => {
      state.loadingPartners = true;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loadingPartners = false;
      state.clientList = action.payload;
    });
    builder.addCase(filterClients.pending, state => {
      state.loadingPartners = true;
    });
    builder.addCase(filterClients.fulfilled, (state, action) => {
      state.loadingPartners = false;
      state.clientList = action.payload;
    });
    builder.addCase(fetchSuppliers.pending, state => {
      state.loadingPartners = true;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.loadingPartners = false;
      state.supplierList = action.payload;
    });
    builder.addCase(filterSuppliers.pending, state => {
      state.loadingPartners = true;
    });
    builder.addCase(filterSuppliers.fulfilled, (state, action) => {
      state.loadingPartners = false;
      state.supplierList = action.payload;
    });
  },
});

export const partnerReducer = partnerSlice.reducer;
