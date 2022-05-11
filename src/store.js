import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '@/modules/auth/features/authSlice';
import {productReducer} from '@/modules/stock/features/productSlice';
import {stockCorrectionReducer} from '@/modules/stock/features/stockCorrectionSlice';
import {stockLocationReducer} from '@/modules/stock/features/stockLocationSlice';
import {trackingNumberReducer} from '@/modules/stock/features/trackingNumberSlice';
import {companyReducer} from '@/modules/auth/features/companySlice';
import {languageReducer} from '@/modules/auth/features/languageSlice';
import { productVariantReducer } from './modules/stock/features/productVariantSlice';
import { productIndicatorsReducer } from './modules/stock/features/productIndicatorsSlice';
import {stockCorrectionReasonReducer
} from '@/modules/stock/features';
import {
  userReducer,
} from '@/modules/auth/features';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    language: languageReducer,
    product: productReducer,
    productVariant: productVariantReducer,
    productIndicators:productIndicatorsReducer,
    stockCorrection: stockCorrectionReducer,
    stockCorrectionReason: stockCorrectionReasonReducer,
    stockLocation: stockLocationReducer,
    trackingNumber: trackingNumberReducer,
  },
});
