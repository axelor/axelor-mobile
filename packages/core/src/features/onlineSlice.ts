import {createSlice} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AopModelApi, AosActionApi} from '../apiProviders';

export interface OnlineState {
  isEnabled: boolean;
}

const initialState: OnlineState = {
  isEnabled: true,
};

export const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    enable: state => {
      state.isEnabled = true;
    },
    disable: state => {
      state.isEnabled = false;
    },
  },
});

export const {disable, enable} = onlineSlice.actions;
export const onlineReducer = onlineSlice.reducer;

const selectOnline = (state: any) => state.online;

export const useOnline = (): OnlineState => useSelector(selectOnline);

export const useEffectOnline = () => {
  const online = useOnline();
  const dispatch = useDispatch();

  return useEffect(() => {
    AopModelApi.isOnlineAvailable = online.isEnabled;
    AosActionApi.isOnlineAvailable = online.isEnabled;
  }, [dispatch, online.isEnabled]);
};
