import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {searchProject as _searchProject} from '../api/project-api';

export const searchProject = createAsyncThunk(
  'Project/searchProject',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProject,
      data,
      action: 'Helpdesk_SearchProject',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingProject: true,
  projectList: [],
  moreLoading: false,
  isListEnd: false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProject, {
      loading: 'loadingProject',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'projectList',
    });
  },
});

export const projectReducer = projectSlice.reducer;
