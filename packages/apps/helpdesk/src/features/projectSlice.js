import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getProject} from '../api/project-api';

export const fetchProject = createAsyncThunk(
  'Project/fetchProject',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: getProject,
      data,
      action: 'Helpdesk_FetchProject',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingProject: true,
  projectList: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProject.pending, state => {
      state.loadingProject = true;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.loadingProject = false;
      state.projectList = action.payload;
    });
  },
});

export const projectReducer = projectSlice.reducer;
