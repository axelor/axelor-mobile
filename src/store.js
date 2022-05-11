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
  internalMoveLineReducer,
  unitReducer,
} from '@/modules/stock/features';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    language: languageReducer,
    product: productReducer,
    unit: unitReducer,
    stockCorrection: stockCorrectionReducer,
    stockCorrectionReason: stockCorrectionReasonReducer,
    stockLocation: stockLocationReducer,
    trackingNumber: trackingNumberReducer,
    internalMove: internalMoveReducer,
    internalMoveLine: internalMoveLineReducer,
  },
});
