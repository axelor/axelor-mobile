import {useHandleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProductStockIndicators} from '../api/product-api';

export const fetchProductIndicators = createAsyncThunk(
  'product/fetchProductIndicators',
  async function (data) {
    return getProductStockIndicators(data)
      .catch(function (error) {
        useHandleError(error, 'fetch product stock indicators');
      })
      .then(response => response.data.object);
  },
);

var getProductAvailabilty = async data => {
  return getProductStockIndicators(data)
    .catch(function (error) {
      useHandleError(error, 'fetch product stock indicators');
    })
    .then(response => {
      return response.data.object;
    });
};

async function fetchData(data) {
  return await getProductAvailabilty(data);
}

export const fetchProductsAvailability = createAsyncThunk(
  'product/fetchProductsAvailability',
  async function (data) {
    let promises = [];
    data.productList.forEach(product => {
      promises.push(
        fetchData({
          productId: product.id,
          companyId: data.companyId,
          stockLocationId: data.stockLocationId,
          version: product.version,
        }),
      );
    });
    return Promise.all(promises);
  },
);

export const fetchProductDistribution = createAsyncThunk(
  'product/fetchProductDistribution',
  async function (data) {
    let promises = [];
    data.stockLocationList.forEach(line => {
      promises.push(
        fetchData({
          productId: data.product.id,
          companyId: data.companyId,
          stockLocationId: line.stockLocation.id,
          version: data.product.version,
        }),
      );
    });
    return Promise.all(promises);
  },
);

const initialState = {
  loading: false,
  productIndicators: {},
  listAvailabilty: [],
  listAvailabiltyDistribution: [],
};

const productIndicators = createSlice({
  name: 'productIndicators',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductIndicators.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductIndicators.fulfilled, (state, action) => {
      state.loading = false;
      state.productIndicators = action.payload;
    });
    builder.addCase(fetchProductsAvailability.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAvailability.fulfilled, (state, action) => {
      state.loading = false;
      state.listAvailabilty = action.payload;
    });
    builder.addCase(fetchProductDistribution.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductDistribution.fulfilled, (state, action) => {
      state.loading = false;
      state.listAvailabiltyDistribution = action.payload;
    });
  },
});

export const productIndicatorsReducer = productIndicators.reducer;
