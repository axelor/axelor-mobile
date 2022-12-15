import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';

interface CameraSliceState {
  isEnabled: boolean;
  cameraKey: string | null;
  photo: string | null;
}

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    isEnabled: false,
    cameraKey: null,
    photo: null,
  },
  reducers: {
    enableCamera(state, action) {
      state.isEnabled = true;
      state.cameraKey = action.payload;
      state.photo = null;
    },
    takePhoto(state, action) {
      state.photo = action.payload;
    },
    disableCamera(state) {
      state.isEnabled = false;
      state.cameraKey = null;
      state.photo = null;
    },
  },
});

export const {enableCamera, takePhoto, disableCamera} = cameraSlice.actions;

const selectCamera = state => state.camera;

export const useCameraSelector: () => CameraSliceState = () =>
  useSelector(selectCamera);

export const useCameraValueByKey: (key: string) => string | null = key => {
  const {cameraKey, photo} = useCameraSelector();
  return useMemo(
    () => (key === cameraKey ? photo : null),
    [cameraKey, key, photo],
  );
};

export default cameraSlice.reducer;
