import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchMailMessages} from '../api/mail-message-api';
import {handlerApiCall} from '../api/utils';

export const getMailMessages = createAsyncThunk(
  'mailMessages/getMailMessages',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchMailMessages,
      data: data,
      action: 'fetch mail messages',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  mailMessagesList: [],
};

const mailMessagesSlice = createSlice({
  name: 'mailMessages',
  initialState,
  extraReducers: builder => {
    builder.addCase(getMailMessages.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(getMailMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.mailMessagesList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.mailMessagesList = [
            ...state.mailMessagesList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const mailMessagesReducer = mailMessagesSlice.reducer;
