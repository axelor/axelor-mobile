import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '@/modules/auth/features/authSlice';
import {productReducer} from '@/modules/stock/features/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
