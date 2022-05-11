import {configureStore} from '@reduxjs/toolkit';
import * as rootReducers from '@/features';
import * as authReducers from '@/modules/auth/features';
import {
  productReducer,
  stockCorrectionReducer,
  stockCorrectionReasonReducer,
  trackingNumberReducer,
  stockLocationReducer,
} from '@/modules/stock/features';

export const store = configureStore({
  reducer: {
    ...rootReducers,
    ...authReducers,
    product: productReducer,
    stockCorrection: stockCorrectionReducer,
    stockCorrectionReason: stockCorrectionReasonReducer,
    stockLocation: stockLocationReducer,
    trackingNumber: trackingNumberReducer,
  },
});
