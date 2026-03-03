/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {
  cancelLeave as _cancelLeave,
  createLeaveRequest as _createLeaveRequest,
  deleteLeave as _deleteLeave,
  fetchLeave as _fetchLeave,
  fetchLeaveById as _fetchLeaveById,
  fetchLeaveReason as _fetchLeaveReason,
  fetchLeaveToValidate as _fetchLeaveToValidate,
  rejectLeave as _rejectLeave,
  sendLeave as _sendLeave,
  updateLeave as _updateLeave,
  validateLeave as _validateLeave,
} from '../api/leave-api';

export const fetchLeave = createAsyncThunk(
  'hr_leave/fetchLeave',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeave,
      data,
      action: 'Hr_SliceAction_FetchLeave',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeaveToValidate = createAsyncThunk(
  'hr_leave/fetchLeaveToValidate',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeaveToValidate,
      data,
      action: 'Hr_SliceAction_FetchLeaveToValidate',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const fetchLeaveById = createAsyncThunk(
  'hr_leave/fetchLeaveById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeaveById,
      data,
      action: 'Hr_SliceAction_FetchLeaveById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchLeaveReason = createAsyncThunk(
  'hr_leave/fetchLeaveReason',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeaveReason,
      data,
      action: 'Hr_SliceAction_FetchLeaveReason',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const sendLeave = createAsyncThunk(
  'hr_leave/sendLeave',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _sendLeave,
      data,
      action: 'Hr_SliceAction_SendLeave',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchLeave(data));
      dispatch(
        fetchLeaveToValidate({user: data.user, companyId: data.companyId}),
      );
      dispatch(fetchLeaveById({leaveId: data.leaveRequestId}));
    });
  },
);

export const validateLeave = createAsyncThunk(
  'hr_leave/validateLeave',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _validateLeave,
      data,
      action: 'Hr_SliceAction_ValidateLeave',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchLeave(data));
      dispatch(
        fetchLeaveToValidate({user: data.user, companyId: data.companyId}),
      );
      dispatch(fetchLeaveById({leaveId: data.leaveRequestId}));
    });
  },
);

export const cancelLeave = createAsyncThunk(
  'hr_leave/cancelLeave',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _cancelLeave,
      data,
      action: 'Hr_SliceAction_CancelLeave',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchLeave(data));
      dispatch(
        fetchLeaveToValidate({user: data.user, companyId: data.companyId}),
      );
      dispatch(fetchLeaveById({leaveId: data.leaveRequestId}));
    });
  },
);

export const rejectLeave = createAsyncThunk(
  'hr_leave/rejectLeave',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _rejectLeave,
      data,
      action: 'Hr_SliceAction_RejectLeave',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchLeave(data));
      dispatch(
        fetchLeaveToValidate({user: data.user, companyId: data.companyId}),
      );
      dispatch(fetchLeaveById({leaveId: data.leaveRequestId}));
    });
  },
);

export const deleteLeave = createAsyncThunk(
  'hr_leave/deleteLeave',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteLeave,
      data,
      action: 'Hr_SliceAction_DeleteLeave',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchLeave(data));
    });
  },
);

export const createLeaveRequest = createAsyncThunk(
  'hr_leave/createLeaveRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createLeaveRequest,
      data,
      action: 'Hr_SliceAction_CreateLeaveRequest',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updateLeave = createAsyncThunk(
  'hr_leave/updateLeave',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateLeave,
      data,
      action: 'Hr_SliceAction_UpdateLeave',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchLeaveById({leaveId: data.leave.id}));
      dispatch(fetchLeave({userId: data.userId, companyId: data.companyId}));
    });
  },
);

const initialState = {
  loadingMyLeave: true,
  moreLoadingMyLeave: false,
  isListEndMyLeave: false,
  myLeaveList: [],

  loadingLeaveToValidate: true,
  moreLoadingLeaveToValidate: false,
  isListEndLeaveToValidate: false,
  leaveToValidateList: [],
  totalNumberLeaveToValidate: 0,

  loadingLeave: true,
  leave: {},

  loadingLeaveReason: true,
  moreLoadingLeaveReason: false,
  isListEndLeaveReason: false,
  leaveReasonList: [],
};

const leaveSlice = createSlice({
  name: 'hr_leave',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchLeave, {
      loading: 'loadingMyLeave',
      moreLoading: 'moreLoadingMyLeave',
      isListEnd: 'isListEndMyLeave',
      list: 'myLeaveList',
    });
    generateInifiniteScrollCases(
      builder,
      fetchLeaveToValidate,
      {
        loading: 'loadingLeaveToValidate',
        moreLoading: 'moreLoadingLeaveToValidate',
        isListEnd: 'isListEndLeaveToValidate',
        list: 'leaveToValidateList',
        total: 'totalNumberLeaveToValidate',
      },
      {
        manageTotal: true,
      },
    );
    generateInifiniteScrollCases(builder, fetchLeaveReason, {
      loading: 'loadingLeaveReason',
      moreLoading: 'moreLoadingLeaveReason',
      isListEnd: 'isListEndLeaveReason',
      list: 'leaveReasonList',
    });
    builder.addCase(fetchLeaveById.pending, state => {
      state.loadingLeave = true;
    });
    builder.addCase(fetchLeaveById.fulfilled, (state, action) => {
      state.loadingLeave = false;
      state.leave = action.payload;
    });
  },
});

export const leaveReducer = leaveSlice.reducer;
