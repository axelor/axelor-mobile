import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchLanguage} from '@/modules/auth/api/language-api';

export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguage',
  async function () {
    return searchLanguage().then(response => response.data.data);
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
