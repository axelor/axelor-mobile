import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchLanguage} from '@/modules/auth/api/language-api';
import {handleError} from '@/api/utils';

export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguage',
  async function () {
    return searchLanguage()
      .catch(function (error) {
        handleError(error, 'fetch languages');
      })
      .then(response => response.data.data);
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
