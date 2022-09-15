import {configureStore} from '@reduxjs/toolkit';
import * as rootReducers from '@/features';
import * as authReducers from '@/modules/auth/features';
import * as stockReducers from '@/modules/stock/features';

export const store = configureStore({
  reducer: {
    ...rootReducers,
    ...authReducers,
    ...stockReducers,
  },
});
