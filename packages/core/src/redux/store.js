import {configureStore} from '@reduxjs/toolkit';
import * as coreReducers from '../features';

export const configGlobalStore = externalReducers => {
  return configureStore({
    reducer: {
      ...coreReducers,
      ...externalReducers,
    },
  });
};
