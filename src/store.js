import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '@/modules/auth/features/authSlice';
import {productReducer} from '@/modules/stock/features/productSlice';
import {stockCorrectionReducer} from '@/modules/stock/features/stockCorrectionSlice';
import {stockLocationReducer} from '@/modules/stock/features/stockLocationSlice';
import {trackingNumberReducer} from '@/modules/stock/features/trackingNumberSlice';
import {companyReducer} from '@/modules/auth/features/companySlice';
import {languageReducer} from '@/modules/auth/features/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    language: languageReducer,
    product: productReducer,
    stockCorrection: stockCorrectionReducer,
    stockLocation: stockLocationReducer,
    trackingNumber: trackingNumberReducer,
  },
});
