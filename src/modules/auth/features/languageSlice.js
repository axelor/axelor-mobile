import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchLanguage} from '@/modules/auth/api/language-api';
import {handlerApiCall} from '@/api/utils';

export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguage',
  async function (data = {}, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchLanguage},
      data,
      'fetch languages',
      {getState},
      {array: true},
    );
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
