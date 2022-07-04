import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchUnit} from '@/modules/stock/api/unit-api';
import {handleError} from '@/api/utils';

export const fetchUnit = createAsyncThunk('unit/fetchUnit', async function () {
  return searchUnit()
    .catch(function (error) {
      handleError(error, 'fetch units');
    })
    .then(response => response.data.data);
});

const initialState = {
  loadingUnit: false,
  unitList: [],
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUnit.pending, state => {
      state.loadingUnit = true;
    });
    builder.addCase(fetchUnit.fulfilled, (state, action) => {
      state.loadingUnit = false;
      state.unitList = action.payload;
    });
  },
});

export const unitReducer = unitSlice.reducer;
