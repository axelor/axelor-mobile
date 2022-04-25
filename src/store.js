import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '@/modules/auth/features/authSlice';
import {productReducer} from '@/modules/stock/features/productSlice';
import {stockCorrectionReducer} from './modules/stock/features/stockCorrectionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    stockCorrection: stockCorrectionReducer,
  },
});
