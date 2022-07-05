import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getLoggedUser} from '@/modules/auth/api/user-api';
import {handleError} from '@/api/utils';

export const fetchActiveUser = createAsyncThunk(
  'user/fetchActiveUser',
  async function () {
    return getLoggedUser()
      .catch(function (error) {
        handleError(error, 'fetch active user');
      })
      .then(response => response.data.data[0]);
  },
);

const initialState = {
  loadingUser: true,
  user: {},
  canModifyCompany: false,
  defaultStockLocation: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeActiveCompany: (state, action) => {
      state.user = {...state.user, activeCompany: action.payload.newCompany};
    },
    changeDefaultStockLocation: (state, action) => {
      state.user = {
        ...state.user,
        workshopStockLocation: action.payload.newStockLocation,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchActiveUser.pending, state => {
      state.loadingUser = true;
    });
    builder.addCase(fetchActiveUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      if (state.user.activeCompany == null) {
        state.canModifyCompany = true;
      }
    });
  },
});

export const {changeActiveCompany, changeDefaultStockLocation} =
  userSlice.actions;

export const userReducer = userSlice.reducer;
