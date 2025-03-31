/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  countUnreadMessages,
  fetchMailMessages,
  fetchModelSubscribers,
  postMailMessageComment,
  readAllMailMessages,
  readMailMessage,
  subscribeRequest,
  unsubscribeRequest,
} from '../api/mail-message-api';

export const getMailMessages = createAsyncThunk(
  'mailMessages/getMailMessages',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchMailMessages,
      data: data,
      action: 'Message_SliceAction_FetchMailMessages',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const sendMailMessageComment = createAsyncThunk(
  'mailMessages/sendMailMessageComment',
  async function (data, {getState, dispatch}) {
    const fetchMailMessageData = {model: data?.model, modelId: data?.modelId};
    return handlerApiCall({
      fetchFunction: postMailMessageComment,
      data: data,
      action: 'Message_SliceAction_PostMailMessageComment',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(getMailMessages({...fetchMailMessageData, page: 0}));
    });
  },
);

export const getModelSubscribers = createAsyncThunk(
  'mailMessages/getModelSubscribers',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchModelSubscribers,
      data: data,
      action: 'Message_SliceAction_FetchModelSubscribers',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const subscribeModel = createAsyncThunk(
  'mailMessages/subscribeModel',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: subscribeRequest,
      data: data,
      action: 'Message_SliceAction_SubscribeToModel',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(getModelSubscribers(data));
    });
  },
);

export const unsubscribeModel = createAsyncThunk(
  'mailMessages/unsubscribeModel',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: unsubscribeRequest,
      data: data,
      action: 'Message_SliceAction_UnsubscribeFromModel',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(getModelSubscribers(data));
    });
  },
);

export const countUnreadMailMessages = createAsyncThunk(
  'mailMessages/countUnreadMailMessages',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: countUnreadMessages,
      data: data,
      action: 'Message_SliceAction_CountUnreadMailMessages',
      getState: getState,
      responseOptions: {isArrayResponse: true, returnTotal: true},
    });
  },
);

export const markMailMessageAsRead = createAsyncThunk(
  'mailMessages/markMailMessageAsRead',
  async function (data, {getState, dispatch}) {
    const fetchMailMessageData = {model: data?.model, modelId: data?.modelId};
    return handlerApiCall({
      fetchFunction: readMailMessage,
      data: data,
      action: 'Message_SliceAction_MarkMailMessageAsRead',
      getState: getState,
      responseOptions: {returnTotal: true},
    }).then(() => {
      dispatch(getMailMessages({...fetchMailMessageData, page: 0}));
      dispatch(countUnreadMailMessages(fetchMailMessageData));
    });
  },
);

export const markAllMailMessageAsRead = createAsyncThunk(
  'mailMessages/markAllMailMessageAsRead',
  async function (data, {getState, dispatch}) {
    const fetchMailMessageData = {model: data?.model, modelId: data?.modelId};
    return handlerApiCall({
      fetchFunction: readAllMailMessages,
      data: data,
      action: 'Message_SliceAction_MarkAllMailMessageAsRead',
      getState: getState,
      responseOptions: {returnTotal: true},
    }).then(() => {
      dispatch(getMailMessages({...fetchMailMessageData, page: 0}));
      dispatch(countUnreadMailMessages(fetchMailMessageData));
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  mailMessagesList: [],

  modelFollowersList: [],

  unreadMessages: 0,

  model: null,
  modelId: null,
};

const mailMessagesSlice = createSlice({
  name: 'mailMessages',
  initialState,
  reducers: {
    registerModel: (state, action) => {
      state.model = action.payload;
    },
    registerModelId: (state, action) => {
      state.modelId = action.payload;
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, getMailMessages, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'mailMessagesList',
    });
    builder.addCase(getModelSubscribers.fulfilled, (state, action) => {
      state.modelFollowersList = action.payload ?? [];
    });
    builder.addCase(countUnreadMailMessages.fulfilled, (state, action) => {
      state.unreadMessages = action.payload;
    });
  },
});

export const {registerModel, registerModelId} = mailMessagesSlice.actions;

export const mailMessagesReducer = mailMessagesSlice.reducer;
