import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '../../api/utils';
import {searchLanguage} from '../api/language-api';

export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguage',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchLanguage,
      data,
      action: 'fetch languages',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  languageList: [],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchLanguages.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      state.loading = false;
      state.languageList = action.payload;
    });
  },
});

export const languageReducer = languageSlice.reducer;
