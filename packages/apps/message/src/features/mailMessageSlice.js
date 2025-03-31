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
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: postMailMessageComment,
      data: data,
      action: 'Message_SliceAction_PostMailMessageComment',
      getState: getState,
      responseOptions: {isArrayResponse: false},
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

export const modelSubscribeRequest = createAsyncThunk(
  'mailMessages/modelSubscribeRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: subscribeRequest,
      data: data,
      action: 'Message_SliceAction_SubscribeToModel',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const modelUnsubscribeRequest = createAsyncThunk(
  'mailMessages/modelUnsubscribeRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: unsubscribeRequest,
      data: data,
      action: 'Message_SliceAction_UnsubscribeFromModel',
      getState: getState,
      responseOptions: {isArrayResponse: false},
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

  loadingFollowers: false,
  modelFollowersList: [],

  reload: false,
  reloadFollowers: false,
  unreadMessages: 0,
};

const mailMessagesSlice = createSlice({
  name: 'mailMessages',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, getMailMessages, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'mailMessagesList',
    });
    builder.addCase(sendMailMessageComment.pending, state => {
      state.reload = false;
    });
    builder.addCase(sendMailMessageComment.fulfilled, state => {
      state.reload = true;
    });
    builder.addCase(getModelSubscribers.pending, state => {
      state.loadingFollowers = true;
      state.reloadFollowers = false;
    });
    builder.addCase(getModelSubscribers.fulfilled, (state, action) => {
      state.loadingFollowers = false;
      state.modelFollowersList = action.payload ? action.payload : [];
    });
    builder.addCase(modelSubscribeRequest.pending, state => {
      state.loadingFollowers = true;
    });
    builder.addCase(modelSubscribeRequest.fulfilled, state => {
      state.loadingFollowers = false;
      state.reloadFollowers = true;
    });
    builder.addCase(modelUnsubscribeRequest.pending, state => {
      state.loadingFollowers = true;
    });
    builder.addCase(modelUnsubscribeRequest.fulfilled, state => {
      state.loadingFollowers = false;
      state.reloadFollowers = true;
    });
    builder.addCase(countUnreadMailMessages.fulfilled, (state, action) => {
      state.unreadMessages = action.payload;
    });
  },
});

export const mailMessagesReducer = mailMessagesSlice.reducer;
