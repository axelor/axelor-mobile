import {configureStore} from '@reduxjs/toolkit';
import {
  authReducer,
  companyReducer,
  languageReducer,
  userReducer,
} from '@/modules/auth/features';
import {
  productReducer,
  stockCorrectionReducer,
  stockCorrectionReasonReducer,
  trackingNumberReducer,
  stockLocationReducer,
  internalMoveReducer,
} from '@/modules/stock/features';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    language: languageReducer,
    product: productReducer,
    stockCorrection: stockCorrectionReducer,
    stockCorrectionReason: stockCorrectionReasonReducer,
    stockLocation: stockLocationReducer,
    trackingNumber: trackingNumberReducer,
    internalMove: internalMoveReducer,
  },
});
