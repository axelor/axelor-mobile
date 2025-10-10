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

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';

export interface CameraPhoto {
  name: string;
  pictureExtention: string;
  dateTime: string;
  type: string;
  size: number;
  base64: string;
  fullBase64: string;
}

interface CameraSliceState {
  isEnabled: boolean;
  cameraKey: string | null;
  photo: CameraPhoto | null;
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
    clearPhoto(state) {
      state.photo = null;
      state.cameraKey = null;
    },
    disableCamera(state) {
      state.isEnabled = false;
    },
  },
});

export const {enableCamera, takePhoto, disableCamera, clearPhoto} =
  cameraSlice.actions;

const selectCamera = state => state.camera;

export const useCameraSelector: () => CameraSliceState = () =>
  useSelector(selectCamera);

export const useCameraValueByKey: (key: string) => CameraPhoto | null = key => {
  const {cameraKey, photo} = useCameraSelector();
  return useMemo(
    () => (key === cameraKey ? photo : null),
    [cameraKey, key, photo],
  );
};

export default cameraSlice.reducer;
